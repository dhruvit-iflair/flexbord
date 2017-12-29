/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var express=require('express');
var organizer=require('../controllers/organizer');
module.exports=function(app){

    var organizerRoute=express.Router();
        organizerRoute.route('/')
                .get(organizer.list)
                .post(organizer.create);
        organizerRoute.route('/logo')
                .post(organizer.logo);
        organizerRoute.route('/upload')
                .post(organizer.upload);
    app.use('/api/organizer',organizerRoute);
};
