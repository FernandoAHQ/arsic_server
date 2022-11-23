const { Schema, model } = require('mongoose');

const TaskSchema = new Schema(
    {

        name:{
            type: String,
            required: true
        },
        description: {
            type: String,
       //   required: true
        },
        asignments:{
            type: [{
                assignedTo: {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                },
                time: {
                    type: Number
                }
            }]
        }
    }
);

TaskSchema.method('toJSON', function(){
    const { __v,  ...object } = this.toObject();
    // object.uid = _id
    return object;
});

module.exports = model('Task', TaskSchema);