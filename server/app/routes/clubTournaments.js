/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var express=require('express');
var clubTournaments=require('../controllers/clubTournaments');
module.exports=function(app){

    var clubTournamentsRoute=express.Router();
        clubTournamentsRoute.route('/')
                .get(clubTournaments.list)
                .post(clubTournaments.create);
        clubTournamentsRoute.route('/:id')
                .get(clubTournaments.getbyid)
                .put(clubTournaments.update)
                .delete(clubTournaments.delete);
        clubTournamentsRoute.route('/byclub/:id')
                .get(clubTournaments.getbyclub);
        clubTournamentsRoute.route('/bysetting/:id')
                .get(clubTournaments.getbysetting);
    app.use('/api/clubTournaments',clubTournamentsRoute);
};
