var mongoose=require('mongoose');
    Schema=mongoose.Schema;
var playerSchema=new Schema({
    captain: Boolean,    
    shirt_number: String,
    members: { type: Schema.Types.ObjectId, ref: 'clubMembers' }
});
module.exports = mongoose.model('player',playerSchema);
