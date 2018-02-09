/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
Schema = mongoose.Schema;
var settingsSchema = new Schema({
    shotclock:Number,
    foulshotclock:Number,
    periodsclockdesc:Boolean,
    timeouttype:String,
    pregameduration:Number,
    pregamebreak:Number,
    pregametimeoutamount:Number,
    pregametimeoutduration:Number,
    postgameduration:Number,
    postgamebreak:Number,
    postgametimeoutamount:Number,
    postgametimeoutduration:Number,
    periodx:[{type:Schema.Types.Mixed}],
    overtimeclockdesc:Boolean,
    pointsaccumulative:Boolean,
    penalty:Boolean,
    noofperiods:Number,
    repeatable:Boolean,
    overtimepregameduration:Number,
    overtimepregamebreak:Number,
    overtimepostgameduration:Number,
    overtimepostgamebreak:Number,
    gamesettings:{ type: Schema.Types.ObjectId, ref: 'gamesettings' }
});
module.exports = mongoose.model('timesettings', settingsSchema);
