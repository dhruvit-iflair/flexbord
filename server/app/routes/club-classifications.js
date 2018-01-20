/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var express=require('express');
var clubClassifications=require('../controllers/club-classifications');
module.exports=function(app){

    var clubClassificationsRoute=express.Router();
        clubClassificationsRoute.route('/')
                .get(clubClassifications.list)
                .post(clubClassifications.create);
        clubClassificationsRoute.route('/:id')
                .get(clubClassifications.getbyid)
                .put(clubClassifications.update)
                .delete(clubClassifications.delete);
        clubClassificationsRoute.route('/byclub/:id')
                .get(clubClassifications.getbyclub);
    app.use('/api/clubClassifications',clubClassificationsRoute);
};
