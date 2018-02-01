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
    usersRoute.route('/listonly/:id')
    .get(users.listOnly);
    usersRoute.route('/upload')
    .post(users.upload);
    usersRoute.route('/verify')
    .get(users.verify);
    usersRoute.route('/resetpwd')
    .post(users.resetpwd);
    usersRoute.route('/setpwd')
    .post(users.setnewpwd);
    usersRoute.route('/checkexplink')
    .post(users.checkexplink);
    usersRoute.route('/:id')
    .get(users.getbyuser)
    .patch(users.update)
    .delete(users.delete)
    .put(users.changepassword);
    app.use('/api/users',usersRoute);
};
