const passport          = require('passport');
const GoogleStrategy    = require('passport-google-oauth20').Strategy;
const keys              = require('./keys');
let User = require('../models/User');


passport.use(
    new GoogleStrategy({
    // Opciones de la estrategia
    callbackURL: '/auth/google/redirect',
    clientID : keys.google.clientID,
    clientSecret: keys.google.clientSecret
    }, 
    (accessToken, refreshToken, profile, cb) => {
        console.log(profile);
        User.findOrCreate({ id: profile.id }, ( err , user ) => {
            return cb( err, user );
        });
    })
);