/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose = require('mongoose');
var clubSeasons = mongoose.model('clubSeasons');

var clubSeasonsCtrl = function () { };


clubSeasonsCtrl.prototype.create = function (req, res) {
    var ses=new clubSeasons(req.body);
    ses.save(function(err,dta){
        if(err){
            console.log('error occured..'+err);
        }
        else{
            res.json(dta);
        }
    });
}

clubSeasonsCtrl.prototype.list = function (req, res) {
clubSeasons.find(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

clubSeasonsCtrl.prototype.getbyid = function (req, res) {
clubSeasons.find({_id:req.params.id}).exec(function (err, usrrs) {
  if (err) console.log('error occured..' + err);
   res.json(usrrs); 
});
}

clubSeasonsCtrl.prototype.getbyclub = function (req, res) {
    clubSeasons.find({ club: req.params.id }).exec(function (err, gd) {
        if (err) console.log('error occured..' + err);
        res.json(gd);
    });
}

clubSeasonsCtrl.prototype.update = function (req, res) {
clubSeasons.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

clubSeasonsCtrl.prototype.delete = function (req, res) {
clubSeasons.findByIdAndRemove({_id:req.params.id},function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

module.exports = new clubSeasonsCtrl();
