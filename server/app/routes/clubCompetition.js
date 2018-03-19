/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/

var express=require('express');
var clubCompetitions=require('../controllers/clubCompetition');
module.exports=function(app){

    var clubCompetitionsRoute=express.Router();
        clubCompetitionsRoute.route('/')
                .get(clubCompetitions.list)
                .post(clubCompetitions.create);
        clubCompetitionsRoute.route('/:id')
                .get(clubCompetitions.getbyid)
                .put(clubCompetitions.update)
                .delete(clubCompetitions.delete);
        clubCompetitionsRoute.route('/bysport/:id')
                .get(clubCompetitions.getbysport);
        clubCompetitionsRoute.route('/bysetting/:id')
                .get(clubCompetitions.getbysetting);
        clubCompetitionsRoute.route('/byseason/:id')
                .get(clubCompetitions.getbyseason);
    app.use('/api/clubcompetitions',clubCompetitionsRoute);
};
