/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var express=require('express');
var roles=require('../controllers/roles');
module.exports=function(app){
    var rolesRoute=express.Router();

    rolesRoute.route('/')
    .get(roles.list)
    .post(roles.create);
    rolesRoute.route('/seeds')
    .get(roles.seeds)
    rolesRoute.route('/:id')
    .get(roles.getbyid)
    .put(roles.update)
    .delete(roles.delete);
    app.use('/api/roles',rolesRoute);
};
