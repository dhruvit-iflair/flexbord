/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var express = require('express');
var sportpoints = require('../controllers/sportpoints');
module.exports = function (app) {
    var sportpointsRoute = express.Router();

    sportpointsRoute.route('/')
        .get(sportpoints.list)
        .post(sportpoints.create);
    sportpointsRoute.route('/bysport/:id')
        .get(sportpoints.getbysport);
    sportpointsRoute.route('/:id')
        .get(sportpoints.getbyid)
        .patch(sportpoints.update)
        .delete(sportpoints.delete);
    app.use('/api/sportpoints', sportpointsRoute);
};
