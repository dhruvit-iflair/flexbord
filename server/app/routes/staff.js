var express=require('express');
var staff=require('../controllers/staff');

module.exports=function(app){
    var staffRoute=express.Router();
        staffRoute.route('/')
                .get(staff.list)
                .post(staff.create);
        staffRoute.route('/:id')
                .get(staff.getbyid)
                .put(staff.update)
                .delete(staff.delete);
            
    app.use('/api/staff',staffRoute);
};
