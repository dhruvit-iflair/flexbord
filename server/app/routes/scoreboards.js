/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var express = require('express');
var Scorer = require('../controllers/scoreboards');
module.exports = function (app) {
    var ScorerRoute = express.Router();

    ScorerRoute.route('/')
        .get(Scorer.list)
        .post(Scorer.create);
    ScorerRoute.route('/bysetting/:id')
        .get(Scorer.getbysetting);
    ScorerRoute.route('/:id')
        .get(Scorer.getbyid)
        .patch(Scorer.update)
        .delete(Scorer.delete);
    app.use('/api/scoreboards', ScorerRoute);
};
