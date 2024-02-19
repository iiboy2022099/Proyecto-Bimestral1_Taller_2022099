const { Schema, model} = require('mongoose');

const ClienteSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria']
    },
    correo: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio']
    },
    img:{
        type: String
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});


module.exports = model('Cliente', ClienteSchema);