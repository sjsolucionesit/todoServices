const bcrypt = require('bcryptjs');

async function encrypt(pass) {
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(pass, salt);
    return hash;
}

async function verifyPass(pass, hash) {
    const result = await bcrypt.compareSync(pass, hash);
    return result;
}

module.exports = {
    encriptar: encrypt,
    verificar: verifyPass
}