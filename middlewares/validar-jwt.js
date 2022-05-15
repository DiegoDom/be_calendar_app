const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) => {

    // x-token headers
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Petición sin token de autorización.'
        })
    }

    try {
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok: false,
            msg: 'Token de autorización inválido.'
        });
    }

    next();

};

module.exports = {
    validarJWT
};