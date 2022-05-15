// Rutas de seguridad/sesion host + /api/auth
const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, iniciarSesion, renovarJWT } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', [
    check('email', 'El email del usuario es invalido').isEmail(),
    check('password', 'El password debe contener al menos 6 caracteres').isLength({ min: 6 }),
    validarCampos
], iniciarSesion);

router.get('/renew', validarJWT, renovarJWT);

router.post('/new', [
    check('name', 'El nombre del usuario es obligatorio').not().isEmpty(),
    check('email', 'El email del usuario es invalido').isEmail(),
    check('password', 'El password debe contener al menos 6 caracteres').isLength({ min: 6 }),
    validarCampos
], crearUsuario);

module.exports = router;