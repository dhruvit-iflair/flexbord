/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var express = require('express');
var clubteams = require('../controllers/clubteams');
module.exports = function (app) {
    var clubteamsRoute = express.Router();

    clubteamsRoute.route('/')
        .get(clubteams.list)
        .post(clubteams.create);
    clubteamsRoute.route('/byclub/:id')
        .get(clubteams.getbyclub);
    clubteamsRoute.route('/logo')
        .post(clubteams.logo);
    clubteamsRoute.route('/:id')
        .get(clubteams.getbyid)
        .patch(clubteams.update)
        .delete(clubteams.delete);
    app.use('/api/clubteams', clubteamsRoute);
};
