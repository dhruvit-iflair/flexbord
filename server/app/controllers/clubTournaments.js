/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose = require('mongoose');
var clubTournaments = mongoose.model('clubTournaments');

var clubTournamentsCtrl = function () { };


clubTournamentsCtrl.prototype.create = function (req, res) {
    var ClubT=new clubTournaments(req.body);
    ClubT.save(function(err,dta){
        if(err){
            console.log('error occured..'+err);
        }
        else{
            res.json(dta);
        }
    });
}

clubTournamentsCtrl.prototype.list = function (req, res) {
    clubTournaments.find().populate('clubSeasons').populate('clubClassifications').exec(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

clubTournamentsCtrl.prototype.getbyid = function (req, res) {
    clubTournaments.find({_id:req.params.id}).populate('clubSeasons').populate('clubClassifications').exec(function (err, usrrs) {
      if (err) console.log('error occured..' + err);
       res.json(usrrs); 
    });
}

clubTournamentsCtrl.prototype.getbyclub = function (req, res) {
    clubTournaments.find({ club: req.params.id }).populate('clubSeasons').populate('clubClassifications').exec(function (err, gd) {
        if (err) console.log('error occured..' + err);
        res.json(gd);
    });
}

clubTournamentsCtrl.prototype.update = function (req, res) {
    clubTournaments.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

clubTournamentsCtrl.prototype.delete = function (req, res) {
    clubTournaments.findByIdAndRemove({_id:req.params.id},function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

module.exports = new clubTournamentsCtrl();
