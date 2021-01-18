//Rutas para autenticar usuario
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');
//Crea un usuarios
//api/auth
router.post('/',
    [
        check('email','Agregar un email válido').isEmail(),
        check('password','El password debe ser minimo de 6').isLength({min:6})
    ],
    authController.autenticarUsuario
);
module.exports = router;