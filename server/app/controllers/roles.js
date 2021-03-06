/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
var Roles = mongoose.model('roles');

var rolesctrl = function () { };


rolesctrl.prototype.create = function (req, res) {
    var urole=new Roles(req.body);
    urole.save(function(err,dta){
        if(err){
            console.log('error occured..'+err);
        }
        else{
            res.json(dta);
        }
    });
}
rolesctrl.prototype.seeds = function (req, res) {
    const roles = [
        { title: 'admin', status: 'active' },
        { title: 'organizer', status: 'active' },
        { title: 'club', status: 'active' }
      ];
    
      // use the Event model to insert/save
      for (role of roles) {
        var newRoles = new Roles(role);
        newRoles.save();
      }
    
      // seeded!
      res.send('Roles Generated!');
   
}
rolesctrl.prototype.list = function (req, res) {
Roles.find(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

rolesctrl.prototype.getbyid = function (req, res) {
Roles.find({_id:req.params.id}).exec(function (err, usrrs) {
  if (err) console.log('error occured..' + err);
   res.json(usrrs); 
});
}

rolesctrl.prototype.update = function (req, res) {
Roles.findByIdAndUpdate({_id:req.params.id},req.body,function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

rolesctrl.prototype.delete = function (req, res) {
Roles.findByIdAndRemove({_id:req.params.id},function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

module.exports = new rolesctrl();
