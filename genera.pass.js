const bcrypt = require('bcryptjs');


function genPass(pass){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    return hash;
}


console.log(genPass('41494946'));