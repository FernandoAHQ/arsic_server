const { Schema, model } = require('mongoose');

const MotherboardSchema = new Schema(
    {

        brand:{
            type: String,
            required: true
        },
        model:{
            type: String,
            required: true
        },

        supportedProcessors: {
            type: [Schema.Types.ObjectId],
            ref: 'Processor'
        }
        
    }
);

MotherboardSchema.method('toJSON', function(){
    const { __v,  ...object } = this.toObject();
    // object.uid = _id
    return object;
});

module.exports = model('Motherboard', MotherboardSchema);