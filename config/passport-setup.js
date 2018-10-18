const passport          = require('passport');
const GoogleStrategy    = require('passport-google-oauth20').Strategy;
const keys              = require('./keys');
passport.use(
    new GoogleStrategy({
    // Opciones de la estrategia
    callbackURL: '/auth/google/redirect',
    clientID : keys.google.clientID,
    clientSecret: keys.google.clientSecret
    }, () => { 

    })
);