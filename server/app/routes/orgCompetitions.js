/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var express=require('express');
var orgCompetitions=require('../controllers/orgCompetitions');
module.exports=function(app){

    var orgCompetitionsRoute=express.Router();
        orgCompetitionsRoute.route('/')
                .get(orgCompetitions.list)
                .post(orgCompetitions.create);
        orgCompetitionsRoute.route('/:id')
                .get(orgCompetitions.getbyid)
                .put(orgCompetitions.update)
                .delete(orgCompetitions.delete);
        orgCompetitionsRoute.route('/byorg/:id')
                .get(orgCompetitions.getbyorg);
    app.use('/api/orgCompetitions',orgCompetitionsRoute);
};
