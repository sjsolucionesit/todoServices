require('dotenv').config({
    path: '../.env'
});

const { pool } = require('../config/db.config');
const nodemailer = require('nodemailer');
const { EMAIL_PASS, EMAIL_USER } = require('../config/index.config');

async function sendEmail(correo, nombre, apellido, cedula) {
    const message = `<!DOCTYPE html>
    <html lang="es" style="width: 100%;">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;600;700;800&display=swap" rel="stylesheet">
        <title>Ubimed | Verifica tu cuenta</title>
    </head>
    <body style="width: 100%; display: flex; justify-content: center; align-items: center;">
        <div style="margin-top: 10px; width: 75%; border: solid 1px grey; padding: 10px;  border-radius: 5px; font-family: 'Poppins', sans-serif;">
            <h1 style="width: 100%; margin: 0; line-height: 28px; color: #41E296;">Hola, ${nombre} ${apellido}!</h1>
            <h3 style="margin-top: 0; color: #41E296; margin-bottom: 10px;">Ubimed te da la bienvenida</h3>
            <hr>
            <p style="margin: 0; margin-bottom: 5px; color: grey;">Para nosotros es un placer brindarte el mejor servicio de salud y ponerlo a tu disposición, lo tienes en 📲💻🖥, usalo! </p>
            <p style="margin: 0; margin-bottom: 10px; color: grey;">Tienes la oportunidad de hablar con profesionales en salud sobre cualquier tema, nuestro servicio es totalmente privado y no compartiremos tu información.</p>
            <small>Por favor verifica tu cuenta:</small>
            <div style="width: 50%; display: flex; justify-content: center;">
                <a href="https://app.ubimed.com.co/verificar-cuenta/${cedula}" style="text-align: center; padding: 10px; text-decoration: none; background: #3AB0F0; color: white; font-weight: 600; cursor: pointer; border-radius: 5px;">Verificar</a>
            </div>
            <small style="font-size: .7em; color: rgb(196, 196, 196); text-align: right; width: 100%;">Powered by: Ubimed Tech</small>
        </div>
    </body>
    </html>`;


    const smtpTransport = await nodemailer.createTransport({
        service: 'Godaddy',
        host: 'smtp.secureserver.net',
        port: 465,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    });

    const mailOptions = {
        from: '"🧑🏾‍💻 Ubimed Seguridad 🙈" <danielmateus@ubimed.com.co>',
        to: correo,
        subject: 'Verifica tu cuenta y todo estará listo!',
        html: message
    }

    await smtpTransport.verify(function(error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Servidor de correos esta listo para enviar!");
            smtpTransport.sendMail(mailOptions, (err, res) => {
                if (err) console.log(err);
                else console.log('El Email de verificación fue enviado a ' + correo);
            });
        }
    });

}

async function sendEmailPinRecuperate(correo, pin) {
    const message = `<!DOCTYPE html>
    <html lang="es" style="width: 100%;">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;600;700;800&display=swap" rel="stylesheet">
        <title>Ubimed | Verifica tu cuenta</title>
    </head>
    <body style="width: 100%; display: flex; justify-content: center; align-items: center;">
        <div style="margin-top: 10px; width: 75%; border: solid 1px grey; padding: 10px;  border-radius: 5px; font-family: 'Poppins', sans-serif;">
            <h1 style="width: 100%; margin: 0; line-height: 28px; color: #41E296;">Hola, Espero tengas un lindo dia !</h1>
            <h3 style="margin-top: 0; color: #41E296; margin-bottom: 10px;">Detectamos que quieres cambiar tu contraseña</h3>
            <hr>
            <p style="margin: 0; margin-bottom: 5px; color: grey;">Tu pin de restablecimiento es: </p>
            <h3>${pin}</h3>
            <p style="margin: 0; margin-bottom: 10px; color: grey;">Si no solicitaste cambiar tu contraseña, comunicate con soporte!</p>
            <div style="width: 50%; display: flex; justify-content: center;">
                <a href="https://api.whatsapp.com/send?phone=+573166989045&text=Soporte%20Tecnico%20Ubimed." style="text-align: center; padding: 10px; text-decoration: none; background: #3AB0F0; color: white; font-weight: 600; cursor: pointer; border-radius: 5px;">Soporte</a>
            </div>
            <small style="font-size: .7em; color: rgb(196, 196, 196); text-align: right; width: 100%;">Powered by: Ubimed Tech</small>
        </div>
    </body>
    </html>`;


    const smtpTransport = await nodemailer.createTransport({
        service: 'Godaddy',
        host: 'smtp.secureserver.net',
        port: 465,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    });

    const mailOptions = {
        from: '"🧑🏾‍💻 Ubimed Seguridad" <danielmateus@ubimed.com.co>',
        to: correo,
        subject: 'Cambio de contraseña!',
        html: message
    }

    await smtpTransport.verify(function(error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Servidor de correos esta listo para enviar!");
            smtpTransport.sendMail(mailOptions, (err, res) => {
                if (err) console.log(err);
                else console.log('El Email de verificación fue enviado a ' + correo);
            });
        }
    });
}

async function sendHc(paciente, hc, formula, orden) {
    const message = `<!DOCTYPE html>
    <html lang="es" style="width: 100%;">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;600;700;800&display=swap" rel="stylesheet">
        <title>Ubimed | historia clínica</title>
    </head>
    <body style="width: 100%; display: flex; justify-content: center; align-items: center;">
        <div style="margin-top: 10px; width: 75%; border: solid 1px grey; padding: 10px;  border-radius: 5px; font-family: 'Poppins', sans-serif;">
            <h1 style="width: 100%; margin: 0; line-height: 28px; color: #41E296;">Hola, Espero tengas un lindo dia !</h1>
            <h3 style="margin-top: 0; color: #41E296; margin-bottom: 10px;">Te enviamos los archivos y resultados generados a partir de tu videoconsulta</h3>
        </div>
    </body>
    </html>`;


    const smtpTransport = await nodemailer.createTransport({
        service: 'Godaddy',
        host: 'smtp.secureserver.net',
        port: 465,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    });

    let adjuntos = [];

    if (hc != '' && formula != '') {
        if(orden != ''){
            adjuntos = [{
                filename: 'historia-clinica.pdf',
                path: hc,
                contentType: 'application/pdf'
            }, {
                filename: 'formula.pdf',
                path: formula,
                contentType: 'application/pdf'
            },{
                filename: 'orden-medica.pdf',
                path: orden,
                contentType: 'application/pdf'
            }] 
        }else{
            adjuntos = [{
                filename: 'historia-clinica.pdf',
                path: hc,
                contentType: 'application/pdf'
            }, {
                filename: 'formula.pdf',
                path: formula,
                contentType: 'application/pdf'
            }] 
        }
    } else {
        adjuntos = [{
            filename: 'historia-clinica.pdf',
            path: hc,
            contentType: 'application/pdf'
        }]
    }

    const mailOptions = {
        from: '"Ubimed HC & Formula" <danielmateus@ubimed.com.co>',
        to: `${paciente}`,
        subject: 'Videoconsulta!',
        html: message,
        attachments: adjuntos
    }

    await smtpTransport.verify(function(error) {
        if (error) {
            console.log(error);
        } else {
            console.log("Servidor de correos esta listo para enviar!");
            smtpTransport.sendMail(mailOptions, (err, res) => {
                if (err) console.log(err);
                else console.log('El Email con la historia clínica fue enviado a ' + correo);
            });
        }
    });
}

async function sendEmailConsulta(datosConsulta) {
    const datos = datosConsulta;
    let ajustarPago = '';
    if(datos.correoDoctor == 'juanunigarro@ubimed.com.co'){
        const tipoSalud = await pool.query(`SELECT * FROM servicio_salud WHERE id_servicio='${datos.correoPaciente}'`);
        if(tipoSalud[0].tipoSalud == 'Particular'){
            const nacionalidad = await pool.query(`SELECT * FROM pacientes WHERE email='${datos.correoPaciente}'`);
            if(nacionalidad[0].pais == 'Colombia' || nacionalidad[0].pais == 'colombia'){
                ajustarPago = `
                                <a href="https://checkout.wompi.co/l/mFyh3V" style="background: rgb(130, 223, 102); padding: 20px 30px; color: black; text-decoration: none; font-weight: 800; border-radius: 5px; box-shadow: 3px 3px rgba(12, 148, 12, 0.199);">Realiza el pago de tu consulta</a>
                            `;
            } else {
                ajustarPago = `
                                <a href="https://checkout.wompi.co/l/zIQOeP" style="background: rgb(130, 223, 102); padding: 20px 30px; color: black; text-decoration: none; font-weight: 800; border-radius: 5px; box-shadow: 3px 3px rgba(12, 148, 12, 0.199);">Realiza el pago de tu consulta</a>
                            `;
            }
        }
    }
    const message = `
    <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Consulta confirmada</title>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;600;700;800&display=swap" rel="stylesheet">
            <style>
                * {
                    font-family: 'Poppins', sans-serif;
                    font-weight: 400;
                }
                
                table,
                th,
                td {
                    border-collapse: collapse;
                }
                
                th,
                td {
                    padding: 2px 4px;
                    text-align: left;
                }
            </style>
        </head>

        <body style="width: 100%;">
            <div style="padding: 20px; margin: 10px; border: solid 1px grey;">
                <h1>Ubimed Consulta medica agendada</h1>
                <p>Es un placer para nosotros brindarte el mejor servicio, te informamos que tienes una consulta agendada con nosotros, Abajo encontraras los detalles de tu consulta y recomendaciones: </p>
                <h3>
                    Fecha: ${datos.fechaConsulta}
                </h3>
                <h3>
                    Hora: ${datos.horaConsulta}
                </h3>
                <h3>Motivo de consulta: ${datos.motivo}</h3>
                <br>
                <br>
                <br>
                <br>
                ${ajustarPago}
                <br>
                <br>
                <br>
                <h2>Recomendaciones</h2>
                <p>
                Ubíquese en un espacio con buena iluminación y si es posible alejado del ruido y de 
                factores de distracción
                </p>
                <p>
                Asegúrese que su dispositivo, celular y/o computador estén cargados y con conexión a 
                Internet de por lo menos 2 Mb
                </p>
                <p>
                Realice pruebas de audio y video desde el equipo destinado para la comunicación 
                </p>
                <p>
                Recuerde ingresar a la plataforma y realizar una prueba de la conexión 15 minutos antes 
                de la hora de la videoconsulta 
                </p>
                <p>
                En caso de no poderse establecer contacto dentro de los primeros diez (10) minutos luego 
                de la hora señalada en la invitación la sesión será cancelada y reprogramada según 
                disponibilidad.  
                </p>
                <p>
                Tenga a la mano una lista con el motivo de consulta y las principales molestias que 
presenta, recuerde estar actualizando esta información de forma permanente en la 
plataforma de Ubimed
                </p>
                <p>
                Tenga a la mano una lista con los medicamentos que toma actualmente y lista de 
                enfermedades que lo aquejan actualmente
                </p>
                <p>
                Recuerde tener a la mano los resultados de exámenes o cualquier otro apoyo diagnóstico 
en formato digital PDF o foto, para facilitar el envío a través de la plataforma en el 
momento que lo solicite su médico.
                </p>
                Si por algún motivo decide cancelar la videoconsulta recuerde hacerlo con 24 horas de 
anticipación a la fecha de la agenda, llamando al pbx <a href="tel: 5727244427">+57 (2) 724-4427‬</a>
                <p>
                Para reagendar la videoconsulta lo puede hacer a través de la plataforma de UbimedCall y 
dispondrá de un tiempo no mayor a 30 días, se puede poner en contacto a través de 
danielmateus@ubimed.com.co	
                </p>
                <p>
                Ubimed, Salud y bienestar donde quiera que estés
                </p>
            </div>
        </body>

        </html>
    `;

    const smtpTransport = await nodemailer.createTransport({
        service: 'Godaddy',
        host: 'smtp.secureserver.net',
        port: 465,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    });

    const mailOptions = {
        from: '"Ubimed Nueva Consulta" <danielmateus@ubimed.com.co>',
        to: `${datos.correoPaciente}`,
        subject: 'Consulta Agendada!',
        html: message
    }

    await smtpTransport.verify(function(error) {
        if (error) {
            console.log(error);
        } else {
            console.log("Servidor de correos esta listo para enviar!");
            smtpTransport.sendMail(mailOptions, (err, res) => {
                if (err) console.log(err);
                else console.log('El Email con la historia clínica fue enviado a ' + correo);
            });
        }
    });
}

async function sendEmailCancelConsulta(datosConsulta) {
    const { motivo, fechaConsulta, horaConsulta, correoPaciente } = datosConsulta;
    const message = `
    <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Consulta confirmada</title>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;600;700;800&display=swap" rel="stylesheet">
            <style>
                * {
                    font-family: 'Poppins', sans-serif;
                    font-weight: 400;
                }
                
                table,
                th,
                td {
                    border-collapse: collapse;
                }
                
                th,
                td {
                    padding: 2px 4px;
                    text-align: left;
                }
            </style>
        </head>

        <body style="width: 100%;">
            <div style="padding: 20px; margin: 10px; border: solid 1px grey;">
                <h1>Ubimed Consulta medica agendada</h1>
                <p>Es un placer para nosotros brindarte el mejor servicio, te informamos que tu profesional de la salud tuvo que cancelar tu consulta por motivos de fuerza mayor, espera tu proximo agendamiento: </p>
                <h1>Consulta cancelada.</h1>
                <h3>
                    Fecha: ${fechaConsulta}
                </h3>
                <h3>
                    Hora: ${horaConsulta}
                </h3>
                <h3>Motivo de consulta: ${motivo}</h3>
            </div>
        </body>

        </html>
    `;

    const smtpTransport = await nodemailer.createTransport({
        service: 'Godaddy',
        host: 'smtp.secureserver.net',
        port: 465,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    });

    const mailOptions = {
        from: '"Ups tu consulta fue cancelada" <danielmateus@ubimed.com.co>',
        to: `${correoPaciente}`,
        subject: 'Consulta Cancelada!',
        html: message
    }

    await smtpTransport.verify(function(error) {
        if (error) {
            console.log(error);
        } else {
            console.log("Servidor de correos esta listo para enviar!");
            smtpTransport.sendMail(mailOptions, (err, res) => {
                if (err) console.log(err);
                else console.log('El Email con la historia clínica fue enviado a ' + correoPaciente);
            });
        }
    });
}

module.exports = {
    sendEmailVerify: sendEmail,
    sendEmailPin: sendEmailPinRecuperate,
    sendEmailHc: sendHc,
    sendEmailConsulta,
    sendEmailCancelConsulta
}