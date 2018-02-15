/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var express = require('express');
var games = require('../controllers/games');
module.exports = function (app) {
    var gamesRoute = express.Router();

    gamesRoute.route('/')
        .get(games.list)
        .post(games.create);
    gamesRoute.route('/:id')
        .get(games.getbyid)
        .patch(games.update)
        .delete(games.delete);
    app.use('/api/games', gamesRoute);
};
