/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose=require('mongoose');
Schema=mongoose.Schema;
var organizerClassificationsSchema=new Schema({
    name:String,    
    value: Array,
    organizer:{ type: Schema.Types.ObjectId, ref: 'organizer' }
});
module.exports = mongoose.model('organizerClassifications',organizerClassificationsSchema);
