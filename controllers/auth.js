const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const iniciarSesion = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Los datos enviados no son incorrectos'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Los datos enviados no son incorrectos'
            });
        }

        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            msg: usuario,
            token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al registrar el usuario...'
        })
    }


};

const renovarJWT = async(req = request, res = response) => {

    const { uid, name } = req;

    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token
    });
};

const crearUsuario = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: `Ya existe un usuario con el correo ${email}`
            });
        }

        usuario = new Usuario(req.body);

        // Encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            msg: usuario,
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al registrar el usuario...'
        });
    }
};

module.exports = {
    iniciarSesion,
    renovarJWT,
    crearUsuario
};