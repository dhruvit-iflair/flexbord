/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/

var mongoose = require('mongoose');
var clubCompetitions = mongoose.model('clubCompetitions');

var clubCompetitionCtrl = function () { };


clubCompetitionCtrl.prototype.create = function (req, res) {
    var orgC=new clubCompetitions(req.body);
    orgC.save(function(err,dta){
        if(err){
            console.log('error occured..'+err);
        }
        else{
            res.json(dta);
        }
    });
}

clubCompetitionCtrl.prototype.list = function (req, res) {
    clubCompetitions.find().populate('clubSeasons').populate('gamesettings').populate('sports').exec(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

clubCompetitionCtrl.prototype.getbyid = function (req, res) {
    clubCompetitions.find({_id:req.params.id}).populate('clubSeasons').populate('gamesettings').exec(function (err, usrrs) {
      if (err) console.log('error occured..' + err);
       res.json(usrrs); 
    });
}

clubCompetitionCtrl.prototype.getbyseason = function (req, res) {
    clubCompetitions.find({ clubSeasons: req.params.id }).populate('clubSeasons').populate('gamesettings').populate('sports').exec(function (err, gd) {
        if (err) console.log('error occured..' + err);
        res.json(gd);
    });
}

clubCompetitionCtrl.prototype.getbysport = function (req, res) {
    clubCompetitions.find({ sports: req.params.id }).populate('clubSeasons').populate('gamesettings').populate('sports').exec(function (err, gds) {
        if (err) console.log('error occured..' + err);
        res.json(gds);
    });
}

clubCompetitionCtrl.prototype.getbysetting = function (req, res) {
    clubCompetitions.find({ gamesettings: req.params.id }).populate('clubSeasons').populate('gamesettings').populate('sports').exec(function (err, gdd) {
        if (err) console.log('error occured..' + err);
        res.json(gdd);
    });
}

clubCompetitionCtrl.prototype.update = function (req, res) {
    clubCompetitions.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

clubCompetitionCtrl.prototype.delete = function (req, res) {
    clubCompetitions.findByIdAndRemove({_id:req.params.id},function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

module.exports = new clubCompetitionCtrl();
