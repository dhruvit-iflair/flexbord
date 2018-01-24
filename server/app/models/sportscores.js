/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
Schema = mongoose.Schema;
var scoresSchema = new Schema({
    wins: String,
    draws: String,
    losses:String,
    sports:{ type: Schema.Types.ObjectId, ref: 'sports' },
    CreatedAt:{type:Date,default:Date.now}
});
module.exports = mongoose.model('sportscores', scoresSchema);
