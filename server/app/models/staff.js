var mongoose=require('mongoose');
    Schema=mongoose.Schema;
var staffSchema=new Schema({
    role: String,
    members: { type: Schema.Types.ObjectId, ref: 'clubMembers' }
});
module.exports = mongoose.model('staff',staffSchema);
