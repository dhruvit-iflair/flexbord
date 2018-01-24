/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
Schema = mongoose.Schema;
var sportplayerstatusSchema = new Schema({
    playerstatus: String,
    colorbtnup: String,
    colorbtndown: String,
    hidefromscoreboard:Boolean,
    sports:{ type: Schema.Types.ObjectId, ref: 'sports' },
    CreatedAt:{type:Date,default:Date.now}
});
module.exports = mongoose.model('sportplayerstatus', sportplayerstatusSchema);
