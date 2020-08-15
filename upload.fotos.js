const uniqid = require('uniqid');
const path = require('path');

async function uploadFotosPaciente(files) {
    if (files.rutaImg != null) {
        const AddressImages = './img/perfil/paciente/';
        const fotoPerfil = files.rutaImg;
        const RutaImg = AddressImages + uniqid() + '.' + getFileExtension(fotoPerfil.name);
        const rutaSave = path.join('./src/public/img/perfil/paciente', RutaImg.split('/')[4]);
        fotoPerfil.mv(rutaSave, (err) => {
            if (err) {
                return console.error(err);
            }
        });
        console.log('Imagen de paciente cargada');
        return RutaImg;
    } else {
        return './img/avatar.jpg';
    }
}

async function uploadFotosDoctor(files) {
    if (files.rutaImg != null) {
        const AddressImages = './img/perfil/doctor/';
        const fotoPerfil = files.rutaImg;
        const RutaImg = AddressImages + uniqid() + '.' + getFileExtension(fotoPerfil.name);
        const rutaSave = path.join('./src/public/img/perfil/doctor', RutaImg.split('/')[4]);
        fotoPerfil.mv(rutaSave, (err) => {
            if (err) {
                console.error(err);
            }
        });
        console.log('Imagen de doctor cargada');
        return RutaImg;
    } else {
        return './img/doctor.png';
    }
}

async function uploadCarneDoctor(files) {
    if (files.rutaCarne != null) {
        const AddressImages2 = './validation/doctores/';
        const fotoPerfil = files.rutaCarne; // datos de post con imagen
        const RutaImg2 = AddressImages2 + uniqid() + '.' + getFileExtension(fotoPerfil.name); // crear ruta para imagen cargada en db
        const rutaSave = path.join('./src/public/validation/doctores', RutaImg2.split('/')[3]); // ruta donde el servidor va a guardar la imagen
        fotoPerfil.mv(rutaSave, (err) => {
            if (err) {
                console.error(err);
            }
        }); // función para subir imagen
        console.log('Imagen tarjeta de doctor cargada');
        return rutaSave;
    } else {
        return console.error('Error cargando tarjeta profesional');
    }
}

//obtener extension de archivo.
function getFileExtension(filename) {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
}

module.exports = {
    uploadFotosDoctor,
    uploadFotosPaciente,
    uploadCarneDoctor
}