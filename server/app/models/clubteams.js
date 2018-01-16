/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
Schema = mongoose.Schema;
var clubteamsSchema = new Schema({
    logo: String,
    name: String,
    address: String,
    building: String,
    street: String,
    country: String,
    state: String,
    city: String,
    zipcode: String,
    sport:String,
    availability:Schema.Types.Mixed,
    club:{ type: Schema.Types.ObjectId, ref: 'club' },
    // sport:{ type: Schema.Types.ObjectId, ref: 'sport' },
});
module.exports = mongoose.model('clubteams', clubteamsSchema);
