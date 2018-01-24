/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var express = require('express');
var sports = require('../controllers/sports');
module.exports = function (app) {
    var sportsRoute = express.Router();

    sportsRoute.route('/')
        .get(sports.list)
        .post(sports.create);
    sportsRoute.route('/:id')
        .get(sports.getbyid)
        .patch(sports.update)
        .delete(sports.delete);
    app.use('/api/sports', sportsRoute);
};
