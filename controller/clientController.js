const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Cliente = require('../models/client');

const clientesPost = async (req, res) =>{
    const{nombre,direccion,correo} = req.body;
    const cliente = new Cliente({nombre, direccion, correo});

    const salt = bcryptjs.genSaltSync();

    await cliente.save();
    res.status(200).json({
        cliente
    });
}

const clientesGet = async (req, res = response ) => {
    const { limite, desde } = req.query;
    const query = { estado: true};

    const [total, clientes] = await Promise.all([
        Cliente.countDocuments(query),
        Cliente.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        clientes
    });
} 

const getClienteByid = async (req, res) => {
    const { id } = req.params;
    const clientes = await Cliente.findOne({_id: id});

    res.status(200).json({
        clientes
    });
}

const clientesPut = async (req, res) => {
    const { id } = req.params;
    const { _id, direccion, google, correo, ...resto} = req.body;
    await Cliente.findByIdAndUpdate(id, resto);

    const clientes = await Cliente.findOne({_id: id});

    res.status(200).json({
        msg: 'Cliente Actualizado exitosamente',
        clientes
    })
}

module.exports = {
    clientesPost,
    clientesGet,
    getClienteByid,
    clientesPut
}
