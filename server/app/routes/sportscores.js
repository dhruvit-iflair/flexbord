/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var express = require('express');
var scores = require('../controllers/sportscores');
module.exports = function (app) {
    var scoresRoutes = express.Router();

    scoresRoutes.route('/')
        .get(scores.list)
        .post(scores.create);
    scoresRoutes.route('/bysport/:id')
        .get(scores.getbysport);
    scoresRoutes.route('/:id')
        .get(scores.getbyid)
        .patch(scores.update)
        .delete(scores.delete);
    app.use('/api/sportscores', scoresRoutes);
};
