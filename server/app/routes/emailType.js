/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var express=require('express');
var emailType=require('../controllers/emailType');
module.exports=function(app){

    var emailTypeRoute=express.Router();
        emailTypeRoute.route('/')
                .get(emailType.list)
                .post(emailType.create);
        emailTypeRoute.route('/:id')
                .get(emailType.getbyid)
                .put(emailType.update)
                .delete(emailType.delete);
    app.use('/api/emailType',emailTypeRoute);
};
