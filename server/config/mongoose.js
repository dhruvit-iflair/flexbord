/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
var config = require('./config.js');
const options = {
  useMongoClient: true
};
module.exports = function () {
    console.log(config.connection + config.dbName);
    mongoose.Promise = require('bluebird');
    var db = mongoose.connect(config.connection + config.dbName,options);    
    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open for:: ' + config.dbName);
    });
    mongoose.connection.on('error', function (err) {
        console.log('Mongoose default connection error: ' + err);
    });
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
    require('../app/models/users');
    require('../app/models/roles');
    require('../app/models/permissions');
    require('../app/models/organizer');
    require('../app/models/orgmembers');
    require('../app/models/seasons');
    require('../app/models/organizer-classifications');
    require('../app/models/orgCompetitions');
    require('../app/models/clubteams');
    require('../app/models/club');
    require('../app/models/clubmembers');
    require('../app/models/clubSeasons');
    require('../app/models/club-classifications');
    require('../app/models/clubTournaments');
    require('../app/models/sports');
    require('../app/models/sportpoints');
    require('../app/models/sportplayerstatus');
    require('../app/models/sportscores');
    require('../app/models/sportfouls');
    require('../app/models/games');
    require('../app/models/gamesettings');
    require('../app/models/timesettings');
    require('../app/models/consequences');
    require('../app/models/structures');
    require('../app/models/playlists');
    require('../app/models/scoreboards');
    require('../app/models/email');
    require('../app/models/emailType');
    require('../app/models/player');
    require('../app/models/staff');
    require('../app/models/clubCompetition');
    return db;
}
