const { Schema, model } = require('mongoose');

const SwitchSchema = new Schema(
    {

        name:{
            type: String,
            required: true
        },
        building:{
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
        password:{
            type: String,
            required: true
        },
        adminPorts:{
            type: [String]
        },
        trunkPort:{
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
        ethernetPorts:{
            type: String,
        },
        gigabitPorts:{
            type: String,
        },
        sfpPorts:{
            type: String,
        },
        poePorts:{
            type: String,
        },
        console:{
            type: Boolean
        }
        
    }
);

SwitchSchema.method('toJSON', function(){
    const { __v,  ...object } = this.toObject();
    // object.uid = _id
    return object;
});

module.exports = model('Switch', SwitchSchema);