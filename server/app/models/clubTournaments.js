/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose=require('mongoose');
Schema=mongoose.Schema;
var clubTournamentsSchema=new Schema({
    name:String,    
    description: String,
    // sports: String,
    sports:{ type: Schema.Types.ObjectId, ref: 'sports' },
    clubSeasons: { type: Schema.Types.ObjectId, ref: 'clubSeasons' },
    club:{ type: Schema.Types.ObjectId, ref: 'club' },
    clubClassifications: { type: Schema.Types.ObjectId, ref: 'clubClassifications' },
    clubClassificationsValue:Array,
    competition:String
});
module.exports = mongoose.model('clubTournaments',clubTournamentsSchema);
