/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var express=require('express');
var users=require('../controllers/users');
module.exports=function(app){
    var usersRoute=express.Router();

    usersRoute.route('/')
    .get(users.list)
    .post(users.create);
    usersRoute.route('/upload')
    .post(users.upload);
    usersRoute.route('/verify')
    .get(users.verify);
    usersRoute.route('/resetpwd')
    .post(users.resetpwd);
    usersRoute.route('/:id')
    .get(users.getbyuser)
    .patch(users.update)
    .delete(users.delete);
    app.use('/api/users',usersRoute);
};
