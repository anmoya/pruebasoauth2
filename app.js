const express = require('express');
const authRoutes = require('./routes/auth-routes');

const app       = express();

// View Engine
app.set('view engine', 'ejs');

// Rutas
app.use('/auth', authRoutes);


app.get('/', ( req , res ) => {
    res.render('home');
});

app.listen(3000, () => console.log('Corriendo...'));