const { Schema, model } = require('mongoose');

const SystemSchema = new Schema(
    {

        name:{
            type: String,
            required: true
        },
        version:{
            type: String,
            required: true
        },

        arquitecture: {
            type: String
        }
        
    }
);

SystemSchema.method('toJSON', function(){
    const { __v,  ...object } = this.toObject();
    // object.uid = _id
    return object;
});

module.exports = model('OperatingSystem', SystemSchema);