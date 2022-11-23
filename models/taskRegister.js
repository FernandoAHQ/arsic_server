const { Schema, model } = require('mongoose');

const TaskRegisterSchema = new Schema(
    {
        task:{
            type: Schema.Types.ObjectId,
            ref: 'Task',
            required: true
        },
        observation:{
            type: String
        },
        solution:{
            type: String
        },
        severity:{
            type: String
        },
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        date:{
            type: Date,
            default: Date.now()
        }

    }
);

TaskRegisterSchema.method('toJSON', function(){
    const { __v,  ...object } = this.toObject();
    // object.uid = _id
    return object;
});

module.exports = model('TaskRegister', TaskRegisterSchema);