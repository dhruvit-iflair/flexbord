/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var express=require('express');
var seasons=require('../controllers/seasons');
module.exports=function(app){

    var seasonsRoute=express.Router();
        seasonsRoute.route('/')
                .get(seasons.list)
                .post(seasons.create);
        seasonsRoute.route('/:id')
                .get(seasons.getbyid)
                .put(seasons.update)
                .delete(seasons.delete);
        seasonsRoute.route('/byorg/:id')
                .get(seasons.getbyorg);
    app.use('/api/seasons',seasonsRoute);
};
