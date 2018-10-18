const passport          = require('passport');
const GoogleStrategy    = require('passport-google-oauth20');
const keys              = require('./keys');
passport.use(
    new GoogleStrategy({
    // Opciones de la estrategia
    clientID : keys.google.clientID,
    clientSecret: keys.google.clientSecret
    }), () => {
        // passport callback function
});