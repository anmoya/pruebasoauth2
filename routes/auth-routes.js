const router = require('express').Router();
const passport = require('passport');


// Ruta auth/login
router.get('/login', ( req , res ) => {
    res.render('login', { user: req.user });
});

// Logout
router.get('/logout', ( req, res ) => {
    res.send('Saliendo...');
});

// Autorización Google
router.get('/google', passport.authenticate('google', {
    // lo que queremos traer desde la información
    // se pueden usar valores separados por coma [1,2,3]
    scope: ['profile']
}));

// callback para redireccionar desde google
router.get('/google/redirect',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
    }
    //res.send('aquí deberíamos manejar los resultados del login. Por ejemplo, guardar en base de datos el token, perfil, etc...');
);

module.exports = router;