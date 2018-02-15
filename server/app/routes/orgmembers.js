/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var express = require('express');
var orgmembers = require('../controllers/orgmembers');
module.exports = function (app) {
    var orgmembersRoute = express.Router();
    var orgmembersRoute2 = express.Router();

    orgmembersRoute.route('/')
        .get(orgmembers.list)
        .post(orgmembers.create);
    orgmembersRoute2.route('/')
        .get(orgmembers.csvDemo)
        .post(orgmembers.import);

    orgmembersRoute.route('/byorg/:id')
    .get(orgmembers.getbyorg);
    orgmembersRoute.route('/:id')
        .get(orgmembers.getbyid)
        .patch(orgmembers.update)
        .delete(orgmembers.delete);
    app.use('/api/orgmembers', orgmembersRoute);
    app.use('/api/csv/organizer/members', orgmembersRoute2);
};
