const { pool } = require('../config/db.config');


async function createCupon(seguridad, empresa, numeroCupones, numeroConsultas) {
    for (x = 0; x < numeroCupones; x++) {
        const caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
        let codigo = "";
        for (i = 0; i < seguridad; i++) codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        const cupon = empresa + '-' + codigo.toUpperCase();
        const guardarCupones = {
            codigo: cupon,
            estado: 'clean',
            empresa,
            consultas: numeroConsultas
        }
        const saveCupons = await pool.query('INSERT INTO cupones SET ?', [guardarCupones]);
    }
    console.log('Cupones guardados');
}

createCupon(10, 'COU50', 5, 50);