/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose=require('mongoose');
Schema=mongoose.Schema;
var clubMembersSchema=new Schema({
    firstname:String,    
    lastname:String,
    gender:String,
    license:String,  
    dob:String,
    memberSince: String,
    address: String,
    // building: String,
    street: String,
    photo: String,
    country: String,
    state: String,
    city: String,
    zipcode: String,
    email: String,
    phonenumber: String,          
    usertype : String, 
    status:String,
    club:{ type: Schema.Types.ObjectId, ref: 'club' }
    // registered: { type: Date, default : Date.now()}
});
module.exports = mongoose.model('clubMembers',clubMembersSchema);
