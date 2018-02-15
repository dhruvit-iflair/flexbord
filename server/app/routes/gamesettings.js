/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var express = require('express');
var settings = require('../controllers/gamesettings');
module.exports = function (app) {
    var settingsRoute = express.Router();

    settingsRoute.route('/')
        .get(settings.list)
        .post(settings.create);
    settingsRoute.route('/:id')
        .get(settings.getbyid)
        .patch(settings.update)
        .delete(settings.delete);
    app.use('/api/gamesettings', settingsRoute);
};
