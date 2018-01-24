/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
Schema = mongoose.Schema;
var sportpointsSchema = new Schema({
    nameofpoint: String,
    valueofpoint: String,
    valueofpointopt:String,
    colorbtnup: String,
    colorbtndown: String,
    hidefromscoreboard:Boolean,
    sports:{ type: Schema.Types.ObjectId, ref: 'sports' },
    CreatedAt:{type:Date,default:Date.now}
});
module.exports = mongoose.model('sportpoints', sportpointsSchema);
