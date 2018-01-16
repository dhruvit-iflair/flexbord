/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var express=require('express');
var clubSeasons=require('../controllers/clubSeasons');
module.exports=function(app){

    var clubSeasonsRoute=express.Router();
        clubSeasonsRoute.route('/')
                .get(clubSeasons.list)
                .post(clubSeasons.create);
        clubSeasonsRoute.route('/:id')
                .get(clubSeasons.getbyid)
                .put(clubSeasons.update)
                .delete(clubSeasons.delete);
        clubSeasonsRoute.route('/byclub/:id')
                .get(clubSeasons.getbyclub);
    app.use('/api/clubSeasons',clubSeasonsRoute);
};
