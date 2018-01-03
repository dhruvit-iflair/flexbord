/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose=require('mongoose');
Schema=mongoose.Schema;
var seasonsSchema=new Schema({
    name:String,    
    start_date: Date,
    end_date: Date
});
module.exports = mongoose.model('seasons',seasonsSchema);
