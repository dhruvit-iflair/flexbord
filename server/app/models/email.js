/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose=require('mongoose');
Schema=mongoose.Schema;
var emailSchema=new Schema({
    title:String,    
    // emailType:{ type: Schema.Types.ObjectId, ref: 'emailType'},  
    subject:String,
    from:String,
    cc:String,
    content:String
});
module.exports = mongoose.model('email',emailSchema);
