/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var express=require('express');
var club=require('../controllers/club');
module.exports=function(app){

    var clubRoute=express.Router();
        clubRoute.route('/')
                .get(club.list)
                .post(club.create);
        clubRoute.route('/logo')
                .post(club.logo);
        clubRoute.route('/upload')
                .post(club.upload);
        clubRoute.route('/:id')
                .get(club.getbyid)
                .put(club.update)
                .delete(club.delete);
    app.use('/api/club',clubRoute);
};
