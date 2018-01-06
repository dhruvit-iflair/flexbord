/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose=require('mongoose');
Schema=mongoose.Schema;
var organizerClassificationsSchema=new Schema({
    name:String,    
    value: Array
});
module.exports = mongoose.model('organizerClassifications',organizerClassificationsSchema);
