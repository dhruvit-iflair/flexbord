/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
Schema = mongoose.Schema;
var orgmembersSchema = new Schema({
    emailAddress: String,
    userType: String,
    organizer:{ type: Schema.Types.ObjectId, ref: 'organizer' },
    status:{type:String,default:"Pending"},
    CreatedAt:{type:Date,default:Date.now}
});
module.exports = mongoose.model('orgmembers', orgmembersSchema);
