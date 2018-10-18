const router = require('express').Router();

// Ruta auth/login
router.get('/login', ( req , res ) => {
    res.render('login');
});

// Logout
router.get('/logout', ( req, res ) => {
    res.send('Saliendo...');
});

// Autorización Google
router.get('/google', ( req, res ) => {
    res.send('logging con gmail');
});

module.exports = router;