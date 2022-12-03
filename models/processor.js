const { Schema, model } = require('mongoose');

const ProcessorSchema = new Schema(
    {

        brand:{
            type: String,
            required: true
        },
        model:{
            type: String,
            required: true
        },

        frequency: {
            type: String
        }
        
    }
);

ProcessorSchema.method('toJSON', function(){
    const { __v,  ...object } = this.toObject();
    // object.uid = _id
    return object;
});

module.exports = model('Processor', ProcessorSchema);