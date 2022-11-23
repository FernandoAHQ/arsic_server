const { Schema, model } = require('mongoose');


const RankingSchema = Schema({

    users: {
        type: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            points: {
                type: Number,
                required: true
            }
        }]
    }

    
    


});




PeriodSchema.method('toJSON', function(){
    const { __v,  ...object } = this.toObject();
    // object.uid = _id
    return object;
});



module.exports = model( 'Ranking', RankingSchema );

