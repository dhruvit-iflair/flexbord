/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose=require('mongoose');
Schema=mongoose.Schema;
var clubSeasonsSchema=new Schema({
    name:String,    
    start_date: Date,
    end_date: Date,
    club:{ type: Schema.Types.ObjectId, ref: 'club' }
});
module.exports = mongoose.model('clubSeasons',clubSeasonsSchema);
