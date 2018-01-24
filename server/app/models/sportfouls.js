/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
Schema = mongoose.Schema;
var scoresSchema = new Schema({
    nameoffoul: String,
    isplayer: Boolean,
    iscoach:Boolean,
    isteam: Boolean,
    valueoffoul: String,
    colorbtnup: String,
    colorbtndown: String,
    istimepenalty: Boolean,
    duration:String,
    isscoringdependable: Boolean,
    minustime:String,
    ispossessiondependable: Boolean,
    sports:{ type: Schema.Types.ObjectId, ref: 'sports' },
    CreatedAt:{type:Date,default:Date.now}
});
module.exports = mongoose.model('sportfouls', scoresSchema);
