/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/

var mongoose=require('mongoose');
Schema=mongoose.Schema;
var clubCompetitionsSchema=new Schema({
    name:String,    
    description: String,
    clubSeasons: { type: Schema.Types.ObjectId, ref: 'clubSeasons' },
    sports:{ type: Schema.Types.ObjectId, ref: 'sports' },
    gamesettings:{ type: Schema.Types.ObjectId, ref: 'gamesettings' },
    CreatedAt:{type:Date,default:Date.now}
});
module.exports = mongoose.model('clubCompetitions',clubCompetitionsSchema);
