/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose=require('mongoose');
Schema=mongoose.Schema;
var orgCompetitionsSchema=new Schema({
    name:String,    
    description: String,
    // sports: String,
    sports:[{ type: Schema.Types.ObjectId, ref: 'sports' }],
    seasons: { type: Schema.Types.ObjectId, ref: 'seasons' },
    organizer:{ type: Schema.Types.ObjectId, ref: 'organizer' },
    organizerClassifications: { type: Schema.Types.ObjectId, ref: 'organizerClassifications' },
    organizerClassificationsValue:String
});
module.exports = mongoose.model('orgCompetitions',orgCompetitionsSchema);
