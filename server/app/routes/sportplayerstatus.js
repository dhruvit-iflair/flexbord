/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var express = require('express');
var sportplayerstatus = require('../controllers/sportplayerstatus');
module.exports = function (app) {
    var sportplayerstatusRoute = express.Router();

    sportplayerstatusRoute.route('/')
        .get(sportplayerstatus.list)
        .post(sportplayerstatus.create);
    sportplayerstatusRoute.route('/bysport/:id')
        .get(sportplayerstatus.getbysport);
    sportplayerstatusRoute.route('/:id')
        .get(sportplayerstatus.getbyid)
        .patch(sportplayerstatus.update)
        .delete(sportplayerstatus.delete);
    app.use('/api/sportplayerstatus', sportplayerstatusRoute);
};
