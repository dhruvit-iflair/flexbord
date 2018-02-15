/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var express = require('express');
var Plists = require('../controllers/playlists');
module.exports = function (app) {
    var plistRoute = express.Router();

    plistRoute.route('/')
        .get(Plists.list)
        .post(Plists.create);
    plistRoute.route('/upload')
        .post(Plists.upload);
    plistRoute.route('/bysetting/:id')
        .get(Plists.getbysetting);
    plistRoute.route('/:id')
        .get(Plists.getbyid)
        .patch(Plists.update)
        .delete(Plists.delete);
    app.use('/api/playlists', plistRoute);
};
