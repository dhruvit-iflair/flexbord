/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var express = require('express');
var timesettings = require('../controllers/timesettings');
module.exports = function (app) {
    var timesettingsRoute = express.Router();

    timesettingsRoute.route('/')
        .get(timesettings.list)
        .post(timesettings.create);
    timesettingsRoute.route('/bysetting/:id')
        .get(timesettings.getbysetting);
    timesettingsRoute.route('/:id')
        .get(timesettings.getbyid)
        .patch(timesettings.update)
        .delete(timesettings.delete);
    app.use('/api/timesettings', timesettingsRoute);
};
