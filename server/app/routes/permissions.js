/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var express=require('express');
var perm=require('../controllers/permissions');
module.exports=function(app){
    var permRoute=express.Router();

    permRoute.route('/')
    .get(perm.list)
    .post(perm.create);
    permRoute.route('/:id')
    .get(perm.getbyid)
    .put(perm.update)
    .delete(perm.delete);
    permRoute.route('/byrole/:id')
    .get(perm.getbyrole)
    .put(perm.updatebyrole);
    app.use('/api/permissions',permRoute);
};
