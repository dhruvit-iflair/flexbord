/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
var Scorer = mongoose.model('scoreboards');

var ScorerCtrl = function () { };

ScorerCtrl.prototype.create = function (req, res) {
    var cdata = new Scorer(req.body);
    cdata.save(function (err, dta) {
        if (err) {
            console.log('error occured..' + err);
        }
        else {
            res.json(dta);
        }
    });
}

ScorerCtrl.prototype.list = function (req, res) {
    Scorer.find().populate('gamesettings').exec(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

ScorerCtrl.prototype.getbyid = function (req, res) {
    Scorer.find({ _id: req.params.id }).populate('gamesettings').exec(function (err, gdt) {
        if (err) console.log('error occured..' + err);
        res.json(gdt);
    });
}

ScorerCtrl.prototype.getbysetting = function (req, res) {
    Scorer.find({ gamesettings: req.params.id }).populate('gamesettings').exec(function (err, gd) {
        if (err) console.log('error occured..' + err);
        res.json(gd);
    });
}

ScorerCtrl.prototype.update = function (req, res) {
    var updateObject = req.body;
    Scorer.update({ _id: req.params.id }, { $set: updateObject }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

ScorerCtrl.prototype.delete = function (req, res) {
    Scorer.findByIdAndRemove({ _id: req.params.id }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

module.exports = new ScorerCtrl();
