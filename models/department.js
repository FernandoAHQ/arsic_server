

const { Schema, model } = require('mongoose');



const DepartmentSchema = Schema({

    name: {
        type: String,
        required: true
    },
    ubication: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isActive:{
        type: Boolean,
        default: true
    }

});


DepartmentSchema.method('toJSON', function(){
    const { __v,  ...object } = this.toObject();
    // object.uid = _id
    return object;
});



module.exports = model( 'Department', DepartmentSchema );

