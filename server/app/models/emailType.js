/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose=require('mongoose');
Schema=mongoose.Schema;
var emailTypeSchema=new Schema({
    title:String
});
module.exports = mongoose.model('emailType',emailTypeSchema);
