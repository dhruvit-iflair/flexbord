/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var path=require('path');

module.exports = function (db) {
    var app = express();    
    app.use('/uploads',express.static(path.join(__dirname, '../uploads')));
    var server = http.createServer(app);
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(passport.initialize());
    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    app.get('/', function (req, res) {
       res.render('index');
    });    
    app.post('/api/login', passport.authenticate('local'), function(req, res) {        
        res.json({user:req.user,msg:'Logged In Successfully.'});      
    });  

    require('../app/routes/users')(app);
    require('../app/routes/roles')(app);
    require('../app/routes/permissions')(app);
    require('../app/routes/organizer')(app);
    require('../app/routes/orgmembers')(app);
    require('../app/routes/seasons')(app);
    require('../app/routes/organizer-classifications')(app);
    require('../app/routes/orgCompetitions')(app);
    require('../app/routes/clubteams')(app);
    require('../app/routes/club')(app);
    require('../app/routes/clubmembers')(app);
    require('../app/routes/clubSeasons')(app);
    require('../app/routes/club-classifications')(app);
    require('../app/routes/clubTournaments')(app);
    require('../app/routes/sports')(app);
    require('../app/routes/sportpoints')(app);
    require('../app/routes/sportplayerstatus')(app);
    require('../app/routes/sportscores')(app);
    require('../app/routes/sportfouls')(app);


    return server;
};