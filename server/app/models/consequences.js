/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
Schema = mongoose.Schema;
var consequenceSchema = new Schema({
    playerconseq:{type:Schema.Types.Mixed},
    teamfaults:{type:Schema.Types.Mixed},
    gamesettings:{ type: Schema.Types.ObjectId, ref: 'gamesettings' }
});
module.exports = mongoose.model('consequences', consequenceSchema);
