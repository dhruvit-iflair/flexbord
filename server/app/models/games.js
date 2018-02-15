/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
Schema = mongoose.Schema;
var gamesSchema = new Schema({
    sports:{ type: Schema.Types.ObjectId, ref: 'sports' },
    settings:String,//{ type: Schema.Types.ObjectId, ref: 'settings' },
    gameType: String,
    competition: String,
    hometeam: { type: Schema.Types.ObjectId, ref: 'clubteams' },
    visitorteam: { type: Schema.Types.ObjectId, ref: 'clubteams' },
    gamenumber: String,
    round: String,
    gamedate: Date,
    gametime: Date,
    gamelocation: String,
    gameplace:String,
    referee: String,
    timer: String,
    umpire1:String,
    umpire2:String,
    scorer:String,
    shotclockoperator:String
});
module.exports = mongoose.model('games', gamesSchema);
