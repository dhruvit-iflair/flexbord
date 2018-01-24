/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var express = require('express');
var fouls = require('../controllers/sportfouls');
module.exports = function (app) {
    var foulsRoutes = express.Router();

    foulsRoutes.route('/')
        .get(fouls.list)
        .post(fouls.create);
    foulsRoutes.route('/bysport/:id')
        .get(fouls.getbysport);
    foulsRoutes.route('/:id')
        .get(fouls.getbyid)
        .patch(fouls.update)
        .delete(fouls.delete);
    app.use('/api/sportfouls', foulsRoutes);
};
