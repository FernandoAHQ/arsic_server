

const { Schema, model } = require('mongoose');
const Period = require('../models/period');



const ServiceSchema = Schema({

    period: {
        type: Schema.Types.ObjectId,
        ref: 'Period'
     //   required: true
    },

    report: {
        type: Schema.Types.ObjectId,
        ref: 'Report',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    folio: {
        type: String
    },
    status: {
        type: String,
        default: 'not-assigned'
    },
    // not-assigned, assigned, in-progress , finalized, cancelled, pending
    // sin asignar, asignado, en proceso, finalizado, cancelado, pendiente...
    
    feedback: {
        type: String
    },
    evidenceImage: {
        type: String,
        default: 'no-image.jpg' 

    },    
    description: {
        type: String
    },
    solution: {
        type: String
    },
    device: {
        type: [String]
    },
    staff: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
    },

    // POR EL ADMINSTRADOR
    severity: { //low, elevated, high, severe
        type: String
    },


    // POR EL USUARIO UNA VEZ FINALIZADO
    points:{ // 0 al 10
        type: Number
    },
    
    score:{ // 0 al 10
        type: Number
    },
    
    comment: {
        type: String
    },

    isRanked: {
        type: Boolean,
        default: false
    }
    

}, { timestamps: true });


ServiceSchema.method('toJSON', function(){
    const { __v,  ...object } = this.toObject();
    // object.uid = _id
    return object;
});



module.exports = model( 'Service', ServiceSchema );

