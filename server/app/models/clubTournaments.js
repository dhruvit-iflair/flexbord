/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose=require('mongoose');
Schema=mongoose.Schema;
var clubTournamentsSchema=new Schema({
    name:String,    
    description: String,
    sports: String,
    clubSeasons: { type: Schema.Types.ObjectId, ref: 'clubSeasons' },
    club:{ type: Schema.Types.ObjectId, ref: 'club' },
    clubClassifications: { type: Schema.Types.ObjectId, ref: 'clubClassifications' },
    clubClassificationsValue:String
});
module.exports = mongoose.model('clubTournaments',clubTournamentsSchema);
