const express       = require('express');
const authRoutes    = require('./routes/auth-routes');
const profileRoutes    = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const keys          = require('./config/keys');
const mongoose      = require ('mongoose');
const cookieSession = require('cookie-session');
const passport      = require('passport');

const app       = express();

// View Engine
app.set('view engine', 'ejs');


// Cookie
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}))

// Inicializar passport
app.use(passport.initialize());
app.use(passport.session());

// Conectar con mongoose
mongoose.connect(keys.mongodb.dbURI);

// Rutas
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);


app.get('/', ( req , res ) => {
    res.render('home');
});

app.listen(3000, () => console.log('Corriendo...'));