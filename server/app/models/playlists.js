/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose=require('mongoose');
Schema=mongoose.Schema;
var plistSchema=new Schema({
    name:String,
    itemName:String,
    itemType:String,
    itemTime:String,
    itemMedia:String,
    gamesettings:{ type: Schema.Types.ObjectId, ref: 'gamesettings' }
});
module.exports = mongoose.model('playlists',plistSchema);
