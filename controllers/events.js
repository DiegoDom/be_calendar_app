const { response, request } = require('express');
const Evento = require('../models/Evento');

const obtenerEventos = async(req = request, res = response) => {

    try {

        const data = await Evento.find().populate('user', 'name');

        res.json({
            ok: true,
            data
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al cosultar los eventos...'
        });
    }
};

const crearEvento = async(req = request, res = response) => {

    const evento = new Evento(req.body);

    try {

        evento.user = req.uid;

        const data = await evento.save();

        res.status(201).json({
            ok: true,
            data
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al registrar el evento...'
        });
    }
};


const actualizarEvento = async(req = request, res = response) => {

    const { id } = req.params;
    const { uid } = req;

    try {

        const evento = await Evento.findById(id);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento que intenta actualizar no existe en la base de datos...'
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'El evento que intenta actualizar no le pertenece a este usuario...'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        };

        const data = await Evento.findByIdAndUpdate(id, nuevoEvento, { new: true });

        res.json({
            ok: true,
            data
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al actualizar el evento...'
        });
    }
};

const eliminarEvento = async(req = request, res = response) => {

    const { id } = req.params;
    const { uid } = req;

    try {

        const evento = await Evento.findById(id);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento que intenta eliminar no existe en la base de datos...'
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'El evento que intenta eliminar no le pertenece a este usuario...'
            });
        }

        await Evento.findByIdAndDelete(id);

        res.json({
            ok: true
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al actualizar el evento...'
        });
    }
};

module.exports = {
    obtenerEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
};