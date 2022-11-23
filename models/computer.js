

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
    
    specs: {
        processor: {
            type: String
        },
        ram: {
            type: String
        },
        storage: {
            type: String
        },
        system: {
            type: String
        }
    }

});


ComputerSchema.method('toJSON', function(){
    const { __v,  ...object } = this.toObject();
    // object.uid = _id
    return object;
});



module.exports = model( 'Computer', ComputerSchema );

