/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose=require('mongoose');
Schema=mongoose.Schema;
var scoreboardSchema=new Schema({
    dispName:String,
    dispStyle:String,
    dispShownOn:Schema.Types.Mixed,
    gameclock:Schema.Types.Mixed,
    gameshotclock:Schema.Types.Mixed,
    // gameperiod:Schema.Types.Mixed,
    gameperiodtitle:Schema.Types.Mixed,
    // gameclockbanner:Schema.Types.Mixed,
    teamslogo:Schema.Types.Mixed,
    points:Schema.Types.Mixed,
    bonus:Schema.Types.Mixed,
    fouls:Schema.Types.Mixed,
    timeouts:Schema.Types.Mixed,
    statistics:Schema.Types.Mixed,
    playerpenlty:Schema.Types.Mixed,
    directions:Schema.Types.Mixed,
    pointstructure:Schema.Types.Mixed,
    gamesettings:{ type: Schema.Types.ObjectId, ref: 'gamesettings' }
});
module.exports = mongoose.model('scoreboards',scoreboardSchema);
