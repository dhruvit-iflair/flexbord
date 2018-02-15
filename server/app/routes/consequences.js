/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var express = require('express');
var consequences = require('../controllers/consequences');
module.exports = function (app) {
    var conseqRoute = express.Router();

    conseqRoute.route('/')
        .get(consequences.list)
        .post(consequences.create);
    conseqRoute.route('/bysetting/:id')
        .get(consequences.getbysetting);
    conseqRoute.route('/:id')
        .get(consequences.getbyid)
        .patch(consequences.update)
        .delete(consequences.delete);
    app.use('/api/consequences', conseqRoute);
};
