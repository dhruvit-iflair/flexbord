/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var express=require('express');
var clubMem=require('../controllers/clubmembers');
module.exports=function(app){

    var clubMemRoute=express.Router();
        clubMemRoute.route('/')
                .get(clubMem.list)
                .post(clubMem.create);
        clubMemRoute.route('/photo')
                .post(clubMem.photo);
        clubMemRoute.route('/statusA/:id')
                .get(clubMem.stateA);
        clubMemRoute.route('/statusP/:id')
                .get(clubMem.stateP);
        clubMemRoute.route('/getByClub/:id')
                .get(clubMem.getbyclub);
        clubMemRoute.route('/:id')
                .get(clubMem.getbyid)
                .put(clubMem.update)
                .delete(clubMem.delete);
    app.use('/api/clubmembers',clubMemRoute);
};
