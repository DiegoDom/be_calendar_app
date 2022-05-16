// Rutas de eventos host + /api/events
const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Todas las rutas aplican el middleware para validar el JWT
router.use(validarJWT);

router.get('/', obtenerEventos);

router.post('/', [
    check('title', 'El titulo del evento es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio del evento es obligatorio').custom(isDate),
    check('end', 'La fecha final del evento es obligatorio').custom(isDate),
    validarCampos
], crearEvento);

router.put('/:id', [
    check('title', 'El titulo del evento es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio del evento es obligatorio').custom(isDate),
    check('end', 'La fecha final del evento es obligatorio').custom(isDate),
    validarCampos
], actualizarEvento);

router.delete('/:id', eliminarEvento);

module.exports = router;