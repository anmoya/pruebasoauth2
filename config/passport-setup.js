const passport          = require('passport');
const GoogleStrategy    = require('passport-google-oauth20');
const keys              = require('./keys');
let User = require('../models/User');

// Serializar Usuario
passport.serializeUser( (user, done) => {
    done( null, user.id );
});

// Deserializar Usuario
passport.deserializeUser( (id, done) => {
    User.findById(id).then( user => {
        done( null, user );
    });
});

passport.use(
    new GoogleStrategy({
    // Opciones de la estrategia
    callbackURL: '/auth/google/redirect',
    clientID : keys.google.clientID,
    clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        
        console.log('Buscamos si existe el usuario: \n #########################');
        User.findOne({ googleId : profile.id })
        .then( usuarioEncontrado => {
            if (usuarioEncontrado) {
                // Si encontramos el usuario, 
                console.log('Usuario existente: ' + usuarioEncontrado);
                done( null, usuarioEncontrado );
            } else {
                // Si no encontramos el usuario, lo creamos
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                })
                .save()
                .then( nuevoUsuario => {
                    console.log('Creamos el usuario: \n' + nuevoUsuario);
                })
            }
        })
        
    })
);