/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
var TimeSetting = mongoose.model('timesettings');

var timesettingCtrl = function () { };

timesettingCtrl.prototype.create = function (req, res) {
    var cdata = new TimeSetting(req.body);
    cdata.save(function (err, dta) {
        if (err) {
            console.log('error occured..' + err);
        }
        else {
            res.json(dta);
        }
    });
}

timesettingCtrl.prototype.list = function (req, res) {
    TimeSetting.find().populate('gamesettings').exec(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

timesettingCtrl.prototype.getbyid = function (req, res) {
    TimeSetting.find({ _id: req.params.id }).populate('gamesettings').exec(function (err, gdt) {
        if (err) console.log('error occured..' + err);
        res.json(gdt);
    });
}

timesettingCtrl.prototype.getbysetting = function (req, res) {
    TimeSetting.find({ gamesettings: req.params.id }).populate('gamesettings').exec(function (err, gd) {
        if (err) console.log('error occured..' + err);
        res.json(gd);
    });
}

timesettingCtrl.prototype.update = function (req, res) {
    var updateObject = req.body;
    TimeSetting.update({ _id: req.params.id }, { $set: updateObject }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

timesettingCtrl.prototype.delete = function (req, res) {
    TimeSetting.findByIdAndRemove({ _id: req.params.id }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}


module.exports = new timesettingCtrl();
