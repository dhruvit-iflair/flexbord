/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose=require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
Schema=mongoose.Schema;
var usersSchema=new Schema({
    username:String,
    password:String,
    isAgreemented:Boolean,
    isVerified:Boolean,
    resetpwdToken:{type:String,default:""},
    resetpwdExpiredOn:{type:String,default:""},
    isProfileSet:{ type: Boolean, default : false}
//    roles:{ type: Schema.Types.ObjectId, ref: 'roles' },
//    person_photo:Object
});
usersSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('users',usersSchema);
