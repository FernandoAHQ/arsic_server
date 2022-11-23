const { Schema, model } = require('mongoose');

const VLANSchema = new Schema(
    {
        vlan:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        ip:{
            type: String,
            required: true
        },
        mask:{
            type: String,
            required: true
        },
        gateway:{
            type: String,
            required: true
        },
        broadcast:{
            type: String,
            required: true
        },
        staticStart:{
            type: String,
            required: true
        },
        staticEnd:{
            type: String,
            required: true
        },
        dynamicStart:{
            type: String,
            required: true
        },
        dynamicEnd:{
            type: String,
            required: true
        },
        
    }
);

VLANSchema.method('toJSON', function(){
    const { __v,  ...object } = this.toObject();
    return object;
});

module.exports = model('Vlan', VLANSchema);