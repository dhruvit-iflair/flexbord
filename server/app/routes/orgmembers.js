/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var express = require('express');
var orgmembers = require('../controllers/orgmembers');
module.exports = function (app) {
    var orgmembersRoute = express.Router();

    orgmembersRoute.route('/')
        .get(orgmembers.list)
        .post(orgmembers.create);
    orgmembersRoute.route('/:id')
        .get(orgmembers.getbyid)
        .patch(orgmembers.update)
        .delete(orgmembers.delete);
    app.use('/api/orgmembers', orgmembersRoute);
};
