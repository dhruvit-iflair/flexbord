/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var express = require('express');
var Stuctures = require('../controllers/structures');
module.exports = function (app) {
    var stucturesRoute = express.Router();

    stucturesRoute.route('/')
        .get(Stuctures.list)
        .post(Stuctures.create);
    stucturesRoute.route('/bysetting/:id')
        .get(Stuctures.getbysetting);
    stucturesRoute.route('/:id')
        .get(Stuctures.getbyid)
        .patch(Stuctures.update)
        .delete(Stuctures.delete);
    app.use('/api/structures', stucturesRoute);
};
