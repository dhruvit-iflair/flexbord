/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
Schema = mongoose.Schema;
var orgmembersSchema = new Schema({
    emailAddress: String,
    userType: String,
    status:{type:String,default:"pending"},
    CreatedAt:{type:Date,default:Date.now}
});
module.exports = mongoose.model('orgmembers', orgmembersSchema);
