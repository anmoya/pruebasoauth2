const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const keys = require('./keys');
let User = require('../models/User');

// Serializar Usuario
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserializar Usuario
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // Opciones de la estrategia
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {

        console.log('Buscamos si existe el usuario: \n #########################');
        User.findOne({ googleId: profile.id })
            .then(usuarioEncontrado => {
                if (usuarioEncontrado) {
                    // Si encontramos el usuario, 
                    console.log('Usuario existente: ' + usuarioEncontrado);
                    done(null, usuarioEncontrado);
                } else {
                    // Si no encontramos el usuario, lo creamos
                    new User({
                        username: profile.displayName,
                        googleId: profile.id
                    })
                        .save()
                        .then(nuevoUsuario => {
                            console.log('Creamos el usuario: \n' + nuevoUsuario);
                            done(null, nuevoUsuario);
                        })
                }
            })

    })
);

passport.use(
    new FacebookStrategy({
        callbackURL: '/auth/facebook/redirect',
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecret

    }, (accessToken, refreshToken, profile, done) => {
        console.log('Buscamos si existe el usuario: \n #########################');
        User.findOne({ facebookId: profile.id })
            .then(usuarioEncontrado => {
                if (usuarioEncontrado) {
                    // Si encontramos el usuario, 
                    console.log('Usuario existente: ' + usuarioEncontrado);
                    done(null, usuarioEncontrado);
                } else {
                    // Si no encontramos el usuario, lo creamos
                    new User({
                        username: profile.displayName,
                        facebookId: profile.id,
                        provider: profile.provider
                    })
                        .save()
                        .then(nuevoUsuario => {
                            console.log('Creamos el usuario: \n' + nuevoUsuario);
                            done(null, usuarioEncontrado);
                        })
                }
            })
    })
);

/* facebook
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script> */