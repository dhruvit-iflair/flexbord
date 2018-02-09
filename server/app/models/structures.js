/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
Schema = mongoose.Schema;
var stucturesSchema = new Schema({
    altname:{type:Schema.Types.Mixed},
    level:String,
    gamesettings:{ type: Schema.Types.ObjectId, ref: 'gamesettings' }
});
module.exports = mongoose.model('structures', stucturesSchema);
