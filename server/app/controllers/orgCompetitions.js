/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose = require('mongoose');
var OrgCompetitions = mongoose.model('orgCompetitions');

var orgCompetitionsCtrl = function () { };


orgCompetitionsCtrl.prototype.create = function (req, res) {
    var orgC=new OrgCompetitions(req.body);
    orgC.save(function(err,dta){
        if(err){
            console.log('error occured..'+err);
        }
        else{
            res.json(dta);
        }
    });
}

orgCompetitionsCtrl.prototype.list = function (req, res) {
    OrgCompetitions.find().populate('seasons').populate('organizerClassifications').exec(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

orgCompetitionsCtrl.prototype.getbyid = function (req, res) {
    OrgCompetitions.find({_id:req.params.id}).populate('seasons').populate('organizerClassifications').exec(function (err, usrrs) {
      if (err) console.log('error occured..' + err);
       res.json(usrrs); 
    });
}

orgCompetitionsCtrl.prototype.update = function (req, res) {
    OrgCompetitions.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

orgCompetitionsCtrl.prototype.delete = function (req, res) {
    OrgCompetitions.findByIdAndRemove({_id:req.params.id},function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

module.exports = new orgCompetitionsCtrl();
