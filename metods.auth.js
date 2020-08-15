const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { verificar } = require('../services/encrypt.pass');
const { pool } = require('../config/db.config');

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pass',
    passReqToCallback: true
}, async(request, username, password, done) => {
    const newUser = {
        username,
        password
    };
    const infoServer = await pool.query(`SELECT estado, email, pass, rol FROM usuarios WHERE email='${newUser.username}'`);
    if (infoServer.length > 0) {
        const datos = infoServer[0];
        if (datos.estado != 0) {
            if (await verificar(newUser.password, datos.pass)) {
                // loqueo correcto
                const pasarDatosUsuario = {
                    email: infoServer[0].email,
                    rol: infoServer[0].rol
                }
                console.log('Usuario Logueado con exito');
                console.table(pasarDatosUsuario);
                return done(null, pasarDatosUsuario);
            } else {
                // contraseña incorrecta
                return done(null, false, request.flash('noPass', 'Ten cuidado, contraseña incorrecta!'));
            }
        } else {
            // el usuario no ha verificado su cuenta
            return done(null, false, request.flash('noVerify', 'No has verificado tu email!'));
        }
    } else {
        // no hay usuario con esa cuenta
        return done(null, false, request.flash('noUser', 'Revisa tu email, no te encontramos en nuestro servicio!'));
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});


passport.deserializeUser((user, done) => {
    done(null, user);
});