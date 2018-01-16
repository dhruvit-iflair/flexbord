/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose=require('mongoose');
Schema=mongoose.Schema;
var clubSchema=new Schema({
    name:String,    
    subDomain:String,
    abbreviation:String,
    affilated:String,  
    logo:String,
    address: String,
    building: String,
    street: String,
    country: String,
    state: String,
    city: String,
    zipcode: String,
    capacity: Number,
    placePic: Array,        
    website: String,
    email: String,
    phonenumber: String,          
    sports : Array, 
    affilation : String,
    registered: { type: Date, default : Date.now()}
});
module.exports = mongoose.model('club',clubSchema);
