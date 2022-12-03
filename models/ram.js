const { Schema, model } = require('mongoose');

const RamSchema = new Schema(
    {

        size:{
            type: String,
            required: true
        },
        type:{
            type: String,
            required: true
        },

        velocity:{
            type: String
        }
        
    }
);

RamSchema.method('toJSON', function(){
    const { __v,  ...object } = this.toObject();
    // object.uid = _id
    return object;
});

module.exports = model('RAM', RamSchema);