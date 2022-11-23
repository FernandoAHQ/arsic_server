const { Schema, model } = require('mongoose');



const APSchema = Schema({

    etiqueta: {
        type: String,
        required: true
    },
    mac: {
        type: String,
        required: true
    },
    serie: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    },

});


APSchema.method('toJSON', function(){
    const { __v,  ...object } = this.toObject();
    // object.uid = _id
    return object;
});



module.exports = model( 'AP', APSchema );