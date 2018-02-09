/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
Schema = mongoose.Schema;
var settingsSchema = new Schema({
    sports:{ type: Schema.Types.ObjectId, ref: 'sports' },
    settings:{ type: Schema.Types.ObjectId, ref: 'gamesettings' },
    settingname: String
});
module.exports = mongoose.model('gamesettings', settingsSchema);
