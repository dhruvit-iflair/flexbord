/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var express=require('express');
var organizerClassifications=require('../controllers/organizer-classifications');
module.exports=function(app){

    var organizerClassificationsRoute=express.Router();
        organizerClassificationsRoute.route('/')
                .get(organizerClassifications.list)
                .post(organizerClassifications.create);
        organizerClassificationsRoute.route('/:id')
                .get(organizerClassifications.getbyid)
                .put(organizerClassifications.update)
                .delete(organizerClassifications.delete);
    app.use('/api/organizerClassifications',organizerClassificationsRoute);
};
