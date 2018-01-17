/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose=require('mongoose');
Schema=mongoose.Schema;
var clubClassificationsSchema=new Schema({
    name:String,    
    value: Array,
    club:{ type: Schema.Types.ObjectId, ref: 'club' }
});
module.exports = mongoose.model('clubClassifications',clubClassificationsSchema);
