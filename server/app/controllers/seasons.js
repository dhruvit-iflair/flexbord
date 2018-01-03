/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose = require('mongoose');
var Seasons = mongoose.model('seasons');

var seasonsCtrl = function () { };


seasonsCtrl.prototype.create = function (req, res) {
    var ses=new Seasons(req.body);
    ses.save(function(err,dta){
        if(err){
            console.log('error occured..'+err);
        }
        else{
            res.json(dta);
        }
    });
}

seasonsCtrl.prototype.list = function (req, res) {
Seasons.find(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

seasonsCtrl.prototype.getbyid = function (req, res) {
Seasons.find({_id:req.params.id}).exec(function (err, usrrs) {
  if (err) console.log('error occured..' + err);
   res.json(usrrs); 
});
}

seasonsCtrl.prototype.update = function (req, res) {
Seasons.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

seasonsCtrl.prototype.delete = function (req, res) {
Seasons.findByIdAndRemove({_id:req.params.id},function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

module.exports = new seasonsCtrl();
