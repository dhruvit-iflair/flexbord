/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
Schema = mongoose.Schema;
var sportsSchema = new Schema({
    name: String,
    typeofsport: String,
    typeofgame: String,
    typeofteam: String,
    CreatedAt:{type:Date,default:Date.now}
});
module.exports = mongoose.model('sports', sportsSchema);
