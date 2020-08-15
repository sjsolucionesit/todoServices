const {pool} = require('../config/db.config');
const bcrypt = require('bcryptjs');

addPass();

async function addPass(){
    const pacientes = await pool.query(`SELECT * FROM pacientes WHERE email='pagricolasdonhugob@hotmail.com'`);
    if(pacientes.length){
        pacientes.forEach( async (informacion, index)=>{
            console.log(index);
            const pass = informacion.cedula;
            const salt = bcrypt.genSaltSync(10);
            const passEncrypt = bcrypt.hashSync(pass, salt);
            console.log('Cedula: ' + pass + ' ' + passEncrypt + 'para' + informacion.email);
            await pool.query(`UPDATE pacientes SET pass='${passEncrypt}' WHERE email='${informacion.email}' AND pass='sinpass'`);
        });
    } else {
        console.log('Todos los pacientes tienen una contraseña');
    }
}

createUser();

async function createUser(){
    const pacientes = await pool.query('SELECT email, pass FROM pacientes where email="pagricolasdonhugob@hotmail.com"');
    if(pacientes.length){
        pacientes.forEach( async (info) => {
            const user = {
                estado: 1,
                email: info.email,
                pass: info.pass,
                rol: 'paciente'
            }
            const result = await pool.query(`INSERT INTO usuarios SET ?`, [user]);
            if(result.insertId){
                console.log('Usuario creado con exito');
            }else{
                console.log('Error');
            }
        })
    }else{
        console.log('Sin pacientes');
    }
}
