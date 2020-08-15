const pdf = require('html-pdf');
const path = require('path');
const { pool } = require('../config/db.config');
const uniq = require('uniqid');
const fs = require('fs');

async function createHc(objetoDatos) {
    const verificarPdf = await pool.query(`SELECT * FROM hcFiles WHERE id_consulta='${objetoDatos.id}'`);
    
    if (JSON.stringify(verificarPdf) != '{}') {
        try {
            const fileDelete = path.join(__dirname, '../src/uploads/hc/', verificarPdf[0].namePdf)
            console.log(fileDelete);
            fs.unlinkSync(fileDelete);
            await pool.query(`DELETE FROM hcFiles WHERE id_consulta='${objetoDatos.id}'`);
            console.log('Successfully Deleted');
        } catch (err) {
            console.error('Error eliminando el pdf');
        }
    }

    const name = `hc-${objetoDatos.cedula}-${uniq()}.pdf`;
    const routeSave = path.join(__dirname, `../src/uploads/hc/${name}`);
    const content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ubimed | Historia Clínica</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
            *{
                font-size: .88em;
            }
            table, th, td {
                border: 1px solid black;
                border-collapse: collapse;
            }
            th, td {
                padding: 2px 4px;
                text-align: left;    
            }
        </style>
    </head>
    <body style="width: 100%; font-family: 'Poppins', sans-serif;">
        <div style="width: 90%; margin: 10px auto; padding: 25px; position: relative;">
            <img src="http://app.clinicaunigarro.com/img/logo.png" width="100px" style="position: absolute; top: 10px; left: 10px;" alt="">
            <br>
            <br>
            <h3 style="width: 100%; text-align: center;">Historia Videoconsulta</h3>
            <br>
            <table style="width: 100%; border: none !important;">
                <tr style="width: 40%; border: none !important;">
                    <th style="width: 30%; border: none !important;">No. Historia video consulta</th>
                    <th style="font-weight: 400; border: none !important;">${objetoDatos.cedula}-${uniq()}</th>
                    <th style="width: 30%; border: none !important;"></th>
                    <th style="font-weight: 400; border: none !important;"><strong>Fecha: </strong>${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}</th>
                </tr>
            </table>
            <h3 style="width: 100%; text-align: center; margin-top: 10px">Identificación de paciente</h3>
            <table class="mt-2" style="width: 100%; margin-top: 10px">
                <tr>
                    <th style="witdh: 20%">Paciente</th>
                    <th style="font-weight: 400;">${objetoDatos.nombre} ${objetoDatos.apellido}</th>
                    <th style="witdh: 20%">No. Documento:</th>
                    <th style="font-weight: 400;">${objetoDatos.cedula}</th>
                </tr>
                <tr>
                    <th>Lugar Nacimiento</th>
                    <th style="font-weight: 400;">${objetoDatos.lugarNacimiento}</th>
                    <th>Fecha Nacimiento</th>
                    <th style="font-weight: 400;">${objetoDatos.fechaNacimiento.split('T')[0]}</th>
                </tr>
                <tr>
                    <th>Ocupación</th>
                    <th style="font-weight: 400;">${typeof objetoDatos.ocupacionData != 'undefined' ? objetoDatos.ocupacionData.descripcion : ''}</th>
                    <th>Genero</th>
                    <th style="font-weight: 400;">${objetoDatos.genero}</th>
                </tr>
                <tr>
                    <th>Pais</th>
                    <th style="font-weight: 400;">${objetoDatos.pais}</th>
                    <th>Ciudad</th>
                    <th style="font-weight: 400;">${objetoDatos.ciudad}</th>
                </tr>
                <tr>
                    <th>Dirección</th>
                    <th style="font-weight: 400;">${objetoDatos.direccion}</th>
                    <th>Teléfono</th>
                    <th style="font-weight: 400;">${objetoDatos.telefono}</th>
                </tr>
                <tr style="width: 100%;">
                    <th>Tutor Legal: </th>
                    <th style="font-weight: 400;">${objetoDatos.nombreTutor}</th>
                    <th>No. Documento:</th>
                    <th style="font-weight: 400;">${objetoDatos.cedulaTutor}</th>
                </tr>
                <tr style="width: 100%;">
                    <th>Empresa</th>
                    <th style="font-weight: 400; width: 25%;">${typeof objetoDatos.saludData != 'undefined' ? objetoDatos.saludData.servicio : 'No registra'}</th>
                    <th>No. Autorización</th>
                    <th style="font-weight: 400; width: 25%;">${objetoDatos.autorizacion}</th>
                </tr>
                <tr style="width: 100%;">
                    <th>Tipo usuario</th>
                    <th style="font-weight: 400; width: 25%;">${objetoDatos.tipoUser}</th>
                    <th>Tipo afiliación</th>
                    <th style="font-weight: 400; width: 25%;">${objetoDatos.afiliacion}</th>
                </tr>
            </table>
            <h4 style="width: 100%; text-align: center; margin: 10px auto;">Anamnesis</h4>
            <table style="width: 100%;">
                <tr>
                    <th style="width: 20%;">Motivo consulta</th>
                    <th style="font-weight: 400;">${objetoDatos.motivo}</th>
                </tr>
                <tr>
                    <th>Enfermedad actual</th>
                    <th style="font-weight: 400;">${objetoDatos.enfermedad}</th>
                </tr>
            </table>
            <table class="mt-2" style="width: 100%; margin-top: 10px">
                <tr>
                    <th style="text-align: letf;">Antecedentes alergicos</th>
                </tr>
                <tr style="height: 20px; vertical-align: top;">        
                    <th style="font-weight: 400;">${objetoDatos.alergias}</th>
                </tr>
            </table>
            <table style="width: 100%; margin-top: 5px;">
                <tr>
                    <th style="text-align: left;">Antecedentes (Farmacológicos, Quirúrgicos, Familiares, Otros)</th>
                </tr>
                <tr style="height: 20px; vertical-align: top;">        
                    <th style="font-weight: 400;">${objetoDatos.antecedentes}</th>
                </tr>
            </table>
            <table class="mt-2" style="width: 100%; margin-top: 10px">
                <tr>
                    <th style="text-align: center;">Hallazgos</th>
                </tr>
                <tr style="height: 30px; vertical-align: top;">
                    <th style="font-weight: 400;">${objetoDatos.hallazgos}</th>
                </tr>
            </table>
            <table class="mt-2" style="width: 100%; margin-top: 10px">
                <tr>
                    <th style="width: 23%; vertical-align: top;">Evaluación paraclinicos:</th>
                    <th style="font-weight: 400; height: 30px; vertical-align: top;">${objetoDatos.paraclinicos}</th>
                </tr>
            </table>
            <table class="mt-2" style="width: 100%; margin-top: 10px">
                <tr>
                    <th style="width: 23%; vertical-align: top; vertical-align: top;">Diagnostico Cie10</th>
                    <th style="font-weight: 400; height: 10px; vertical-align: top;">${objetoDatos.cie10}</th>
                </tr>
                <tr>
                    <th style="width: 23%; vertical-align: top;">Diagnostico clínico</th>
                    <th style="font-weight: 400; height: 10px; vertical-align: top;">${objetoDatos.disagnostico}</th>
                </tr>
            </table>
            <table class="mt-2" style="width: 100%; margin-top: 10px">
                <tr>
                    <th style="width: 23%; vertical-align: top; text-align: center;">Recomendación y plan:</th>
                </tr>
                <tr style="width: 100%;">
                    <th style="font-weight: 400; height: 40px; vertical-align: top;">${objetoDatos.plan}</th>
                </tr>
            </table>
            <table class="mt-2" style="margin-top: 10px">
                <tr>
                    <th>${objetoDatos.doc.nombre} ${objetoDatos.doc.apellido}</th>
                </tr>
                <tr>
                    <th>Numero Prof.</th>
                    <th style="font-weight: 400;">${objetoDatos.doc.numeroCarne}</th>
                </tr>
                <tr>
                    <th>Especialización:</th>
                    <th style="font-weight: 400;">${objetoDatos.doc.especialidad}</th>
                </tr>
                <small>Firmado digitalmente por ${objetoDatos.doc.nombre} ${objetoDatos.doc.apellido}.</small>
            </table>
        </div>
        <div style="font-size: .8em; position: absolute; bottom: 30px; right: 20px; text-align: right;">
            <p style="margin: 0px;">Clinica Oftalmologica Unigarro</p>
            <p style="margin: 0px;">Cra. 26 # 15-62 CC Zaguan del lago 4to piso.</p>
            <p style="margin: 0px;">Pasto, Nariño</p>
            <p style="margin: 0px;">PBX: (57)(2)7244427</p>
        </div>
    </body>
    </html>
    `
    pdf.create(content, {
        "border": {
            "top": "1cm", // default is 0, units: mm, cm, in, px
            "right": ".5cm",
            "bottom": "1cm",
            "left": ".5cm"
        }
    }).toFile(routeSave, async function(err, res) {
        if (err) {
            console.log(err);
        } else {
            const dataFile = {
                id_consulta: objetoDatos.id,
                doctor: objetoDatos.doc.email,
                paciente: objetoDatos.email,
                file: routeSave,
                namePdf: name
            }
            console.log('creado');
            subirArchivoBD = await pool.query('INSERT INTO hcFiles SET ?', [dataFile]);
        }
    });
}

async function createFormula(objetoDatos) {
    const verificarPdf = await pool.query(`SELECT * FROM formulaFiles WHERE id_consulta='${objetoDatos.id}'`);
    
    if (JSON.stringify(verificarPdf) != '{}') {
        try {
            const fileDelete = path.join(__dirname, '../src/uploads/formula/', verificarPdf[0].namePdf)
            console.log(fileDelete);
            fs.unlinkSync(fileDelete);
            await pool.query(`DELETE FROM formulaFiles WHERE id_consulta='${objetoDatos.id}'`);
            console.log('Successfully Deleted');
        } catch (err) {
            console.error('Error eliminando el pdf');
        }
    }

    const name = `formula-${objetoDatos.cedula}-${uniq()}.pdf`;
    const routeSave = path.join(__dirname, `../src/uploads/formula/${name}`);

    if(typeof objetoDatos.ocupacionData == 'undefined'){
        ocupacionDatosDb = 'no registra';
    }else{
        ocupacionDatosDb = objetoDatos.ocupacionData.descripcion;
    }
    let contenedorFormula = '';
    let medicamento = '';
    let formula = '';
    let cantidad = '';
    let Presentacion = '';
    let descripcion = '';
    let contador = 0;
    let medica = '';
    const arrayMedicamentos = objetoDatos.formulaNueva;
    const delimitador = arrayMedicamentos.length / 5;
    for(let i = 0; i < delimitador; i++){
        const offset = i * 5;
        if(arrayMedicamentos[offset] != undefined && arrayMedicamentos[offset + 1] != undefined && arrayMedicamentos[offset + 2] != undefined && arrayMedicamentos[offset + 3] != undefined && arrayMedicamentos[offset + 4] != undefined){
            medicamento = arrayMedicamentos[offset];
            formula = arrayMedicamentos[offset + 1];
            cantidad = arrayMedicamentos[offset + 2];
            Presentacion = arrayMedicamentos[offset + 3];
            descripcion = arrayMedicamentos[offset + 4];
            medica = `
                <br>
                <h6 style="margin: 2px 0px;">Medicamento No. ${i+1}</h6>
                <table style="width: 100%; margin-top: 3px;">
                    <tr style="width: 100%;">
                        <th style="text-align: center;">Medicamento</th>
                        <th style="text-align: center;">Farmaceutica</th>
                        <th style="text-align: center;">Cantidad</th>
                        <th style="text-align: center;">Presentación</th>
                    </tr>
                    <tr style="width: 100%;">
                        <th>${medicamento}</th>
                        <th>${formula}</th>
                        <th>${cantidad}</th>
                        <th>${Presentacion}</th>
                    </tr>
                </table>
                <table style="width: 100%; margin-top: 3px;>
                    <tr style="width: 100%;  margin-top: 2px;">
                        <th style="width: 100%; text-align: center;">Descripción</th>
                    </tr><tr style="width: 100%;">
                        <th style="width: 100%;">${descripcion}</th>
                    </tr>
                </table>
    
            `;
            contenedorFormula += medica;
        }
    }
    
    const content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ubimed | Formula medica</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
            *{
                font-size: .88em;
            }
            table, th, td {
                border: 1px solid black;
                border-collapse: collapse;
            }
            th, td {
                padding: 2px 4px;
                text-align: left;    
            }
        </style>
    </head>
    <body style="width: 100%; font-family: 'Poppins', sans-serif;">
        <div style="width: 90%; margin: 10px auto; padding: 10px; position: relative;">
            <img src="http://app.clinicaunigarro.com/img/logo.png" width="100px" style="position: absolute; top: 10px; left: 10px;" alt="">
            <br>
            <br>
            <br>
            <h3 style="width: 100%; text-align: center;">Formula Medica</h3>
            <br>
            <br>
            <table style="width: 100%; border: none;">
                <tr style="width: 40%;">
                    <th style="width: 10%; border: none;">No. </th>
                    <th style="font-weight: 400; border: none;">${objetoDatos.cedula}-${uniq()}</th>
                </tr>
                <tr>
                    <th style="border: none;">Fecha: </th>
                    <th style="font-weight: 400; border: none;">${new Date()}</th>
                </tr>
            </table>
            <h3 style="width: 100%; text-align: center;">Identificación de paciente</h3>
            <table style="width: 100%;">
                <tr>
                    <th>Paciente</th>
                    <th style="font-weight: 400;">${objetoDatos.nombre} ${objetoDatos.apellido}</th>
                    <th>Documento</th>
                    <th style="font-weight: 400;">${objetoDatos.tipoDoc} ${objetoDatos.cedula}</th>
                </tr>
                <tr>
                    <th>Lugar Nacimiento</th>
                    <th style="font-weight: 400;">${objetoDatos.lugarNacimiento}</th>
                    <th>Fecha Nacimiento</th>
                    <th style="font-weight: 400;">${objetoDatos.fechaNacimiento}</th>
                </tr>
                <tr>
                    <th>Ocupación</th>
                    <th style="font-weight: 400;">${ocupacionDatosDb}</th>
                    <th>Genero</th>
                    <th style="font-weight: 400;">${objetoDatos.genero}</th>
                </tr>
                <tr>
                    <th>Pais</th>
                    <th style="font-weight: 400;">${objetoDatos.pais}</th>
                    <th>Ciudad</th>
                    <th style="font-weight: 400;">${objetoDatos.ciudad}</th>
                </tr>
                <tr>
                    <th>Dirección</th>
                    <th style="font-weight: 400;">${objetoDatos.direccion}</th>
                    <th>Teléfono</th>
                    <th style="font-weight: 400;">${objetoDatos.telefono}</th>
                </tr>
            </table>
            <br>
            <h4 style="width: 100%; text-align: center;">Fomula medica</h4;
            <br>
            ${contenedorFormula}
            <br>
            <table>
                <tr>
                    <th>${objetoDatos.doc.nombre} ${objetoDatos.doc.apellido}</th>
                </tr>
                <tr>
                    <th>Numero Prof.</th>
                    <th style="font-weight: 400;">${objetoDatos.doc.numeroCarne}</th>
                </tr>
                <tr>
                    <th>Especialización:</th>
                    <th style="font-weight: 400;">${objetoDatos.doc.especialidad}</th>
                </tr>
            </table>
            <small>Firmado digitalmente por Ubimed SAS.</small>
        </div>
    </body>
    </html>
    `;
    
    pdf.create(content).toFile(routeSave, async function(err, res) {
        if (err) {
            console.log(err);
        } else {
            const dataFile = {
                id_consulta: objetoDatos.id,
                doctor: objetoDatos.doc.email,
                paciente: objetoDatos.email,
                file: routeSave,
                namePdf: name
            }
            console.log('creado');
            subirArchivoBD = await pool.query('INSERT INTO formulaFiles SET ?', [dataFile]);
        }
    });
}

async function createOrdenes(objetoDatos) {
    const verificarPdf = await pool.query(`SELECT * FROM ordenesFiles WHERE id_consulta='${objetoDatos.id}'`);
    
    if (JSON.stringify(verificarPdf) != '{}') {
        try {
            const fileDelete = path.join(__dirname, '../src/uploads/ordenes/', verificarPdf[0].namePdf)
            console.log(fileDelete);
            fs.unlinkSync(fileDelete);
            await pool.query(`DELETE FROM ordenesFiles WHERE id_consulta='${objetoDatos.id}'`);
            console.log('Successfully Deleted');
        } catch (err) {
            console.error('Error eliminando el pdf');
        }
    }

    const name = `ordenes-${objetoDatos.cedula}-${uniq()}.pdf`;
    const routeSave = path.join(__dirname, `../src/uploads/ordenes/${name}`);

    if(typeof objetoDatos.ocupacionData == 'undefined'){
        ocupacionDatosDb = 'no registra';
    }else{
        ocupacionDatosDb = objetoDatos.ocupacionData.descripcion;
    }
    let contenedorFormula = '';
    let medicamento = '';
    let formula = '';
    let cantidad = '';
    let Presentacion = '';
    let descripcion = '';
    let contador = 0;
    let medica = '';
    const arrayMedicamentos = objetoDatos.ordenNueva;
    const delimitador = arrayMedicamentos.length / 4;
    for(let i = 0; i < delimitador; i++){
        const offset = i * 4;
        if(arrayMedicamentos[offset] != undefined && arrayMedicamentos[offset + 1] != undefined && arrayMedicamentos[offset + 2] != undefined && arrayMedicamentos[offset + 3] != undefined){
            medicamento = arrayMedicamentos[offset];
            formula = arrayMedicamentos[offset + 1];
            cantidad = arrayMedicamentos[offset + 2];
            descripcion = arrayMedicamentos[offset + 3];
            medica = `
                <br>
                <h6 style="margin: 2px 0px;">Orden No. ${i+1}</h6>
                <table style="width: 100%; margin-top: 3px;">
                    <tr style="width: 100%;">
                        <th style="text-align: center;">Procedimiento</th>
                        <th style="text-align: center;">Cantidad</th>
                        <th style="text-align: center;">Lateralidad</th>
                    </tr>
                    <tr style="width: 100%;">
                        <th>${medicamento}</th>
                        <th>${formula}</th>
                        <th>${cantidad}</th>
                    </tr>
                </table>
                <table style="width: 100%; margin-top: 3px;>
                    <tr style="width: 100%;  margin-top: 2px;">
                        <th style="width: 100%; text-align: center;">Descripción</th>
                    </tr><tr style="width: 100%;">
                        <th style="width: 100%;">${descripcion}</th>
                    </tr>
                </table>
    
            `;
            contenedorFormula += medica;
        }
    }
    
    const content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ubimed | Formula medica</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
            *{
                font-size: .88em;
            }
            table, th, td {
                border: 1px solid black;
                border-collapse: collapse;
            }
            th, td {
                padding: 2px 4px;
                text-align: left;    
            }
        </style>
    </head>
    <body style="width: 100%; font-family: 'Poppins', sans-serif;">
        <div style="width: 90%; margin: 10px auto; padding: 10px; position: relative;">
            <img src="http://app.clinicaunigarro.com/img/logo.png" width="100px" style="position: absolute; top: 10px; left: 10px;" alt="">
            <br>
            <br>
            <br>
            <h3 style="width: 100%; text-align: center;">Ordenes Medicas</h3>
            <br>
            <br>
            <table style="width: 100%; border: none;">
                <tr style="width: 40%;">
                    <th style="width: 10%; border: none;">No. </th>
                    <th style="font-weight: 400; border: none;">${objetoDatos.cedula}-${uniq()}</th>
                </tr>
                <tr>
                    <th style="border: none;">Fecha: </th>
                    <th style="font-weight: 400; border: none;">${new Date()}</th>
                </tr>
            </table>
            <h3 style="width: 100%; text-align: center;">Identificación de paciente</h3>
            <table style="width: 100%;">
                <tr>
                    <th>Paciente</th>
                    <th style="font-weight: 400;">${objetoDatos.nombre} ${objetoDatos.apellido}</th>
                    <th>Documento</th>
                    <th style="font-weight: 400;">${objetoDatos.tipoDoc} ${objetoDatos.cedula}</th>
                </tr>
                <tr>
                    <th>Lugar Nacimiento</th>
                    <th style="font-weight: 400;">${objetoDatos.lugarNacimiento}</th>
                    <th>Fecha Nacimiento</th>
                    <th style="font-weight: 400;">${objetoDatos.fechaNacimiento}</th>
                </tr>
                <tr>
                    <th>Ocupación</th>
                    <th style="font-weight: 400;">${ocupacionDatosDb}</th>
                    <th>Genero</th>
                    <th style="font-weight: 400;">${objetoDatos.genero}</th>
                </tr>
                <tr>
                    <th>Pais</th>
                    <th style="font-weight: 400;">${objetoDatos.pais}</th>
                    <th>Ciudad</th>
                    <th style="font-weight: 400;">${objetoDatos.ciudad}</th>
                </tr>
                <tr>
                    <th>Dirección</th>
                    <th style="font-weight: 400;">${objetoDatos.direccion}</th>
                    <th>Teléfono</th>
                    <th style="font-weight: 400;">${objetoDatos.telefono}</th>
                </tr>
            </table>
            <br>
            <h4 style="width: 100%; text-align: center;">Orden Medica</h4;
            <br>
            ${contenedorFormula}
            <br>
            <table>
                <tr>
                    <th>${objetoDatos.doc.nombre} ${objetoDatos.doc.apellido}</th>
                </tr>
                <tr>
                    <th>Numero Prof.</th>
                    <th style="font-weight: 400;">${objetoDatos.doc.numeroCarne}</th>
                </tr>
                <tr>
                    <th>Especialización:</th>
                    <th style="font-weight: 400;">${objetoDatos.doc.especialidad}</th>
                </tr>
            </table>
            <small>Firmado digitalmente por Ubimed SAS.</small>
        </div>
    </body>
    </html>
    `;
    
    pdf.create(content).toFile(routeSave, async function(err, res) {
        if (err) {
            console.log(err);
        } else {
            const dataFile = {
                id_consulta: objetoDatos.id,
                doctor: objetoDatos.doc.email,
                paciente: objetoDatos.email,
                file: routeSave,
                namePdf: name
            }
            console.log('creado');
            subirArchivoBD = await pool.query('INSERT INTO ordenesFiles SET ?', [dataFile]);
        }
    });
}

module.exports = {
    createHc,
    createFormula,
    createOrdenes
}