/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose=require('mongoose');
Schema=mongoose.Schema;
var rolesSchema=new Schema({
    title:String,    
    status:String
});
module.exports = mongoose.model('roles',rolesSchema);
