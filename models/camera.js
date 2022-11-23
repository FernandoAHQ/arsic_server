const { Schema, model } = require('mongoose');

const CameraSchema = new Schema(
    {

        tag:{
            type: String,
            required: true
        },
        macAddress: {
            type: String,
         //   required: true
        },
        ip:{
            type: String,
            required: true
        },
        brand:{
            type: String,
            required: true
        },
        model:{
            type: String,
            required: true
        },
        serie:{
            type: String,
            required: true
        },
        switch:{
            type: Schema.Types.ObjectId,
            ref: 'Switch'
        },
        port:{
            type: Number,
        }
    }
);

CameraSchema.method('toJSON', function(){
    const { __v,  ...object } = this.toObject();
    // object.uid = _id
    return object;
});

module.exports = model('Camera', CameraSchema);