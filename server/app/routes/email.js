/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var express=require('express');
var email=require('../controllers/email');
module.exports=function(app){

    var emailRoute=express.Router();
        emailRoute.route('/')
                .get(email.list)
                .post(email.create);
        emailRoute.route('/:id')
                .get(email.getbyid)
                .put(email.update)
                .delete(email.delete);
    app.use('/api/email',emailRoute);
};
