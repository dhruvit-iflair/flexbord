/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose=require('mongoose');
Schema=mongoose.Schema;
var orgCompetitionsSchema=new Schema({
    name:String,    
    description: String,
    sports: String,
    seasons: { type: Schema.Types.ObjectId, ref: 'seasons' },
    organizerClassifications: { type: Schema.Types.ObjectId, ref: 'organizerClassifications' }
});
module.exports = mongoose.model('orgCompetitions',orgCompetitionsSchema);
