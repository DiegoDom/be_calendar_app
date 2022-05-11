const { response } = require('express');

const iniciarSesion = (req, res = response) => {

    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: 'Login',
        email,
        password
    });
};

const renovarJWT = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Renew JWT'
    });
};

const crearUsuario = (req, res = response) => {

    const { name, email, password } = req.body;

    res.status(201).json({
        ok: true,
        msg: 'Registro',
        name,
        email,
        password
    });
};

module.exports = {
    iniciarSesion,
    renovarJWT,
    crearUsuario
};