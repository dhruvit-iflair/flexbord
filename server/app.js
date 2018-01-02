/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose=require('./config/mongoose.js');
var express=require('./config/express.js');
var config=require('./config/config.js');
var db=mongoose();
var app=express(db);
app.listen(config.serverPort);
console.log('Magic Happens on ::'+config.serverPort);
module.exports=app;