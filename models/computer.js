

const { Schema, model } = require('mongoose');



const ComputerSchema = Schema({

    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },

    folio: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Active"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    
    specs: {
        processor: {
            type: Schema.Types.ObjectId,
            ref: 'Processor'
        },
        ram: {
            type: Schema.Types.ObjectId,
            ref: 'RAM'
        },
        storage: {
            type: {
                type: String
            },
            capacity: {
                type: Number
            },

        },
        motherboard: {
            type: Schema.Types.ObjectId,
            ref: 'Motherboard'
        },
        os: {
            type: Schema.Types.ObjectId,
            ref: 'OperatingSystem'
        }
    }

});


ComputerSchema.method('toJSON', function(){
    const { __v,  ...object } = this.toObject();
    // object.uid = _id
    return object;
});



module.exports = model( 'Computer', ComputerSchema );

