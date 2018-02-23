/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
var Conseq = mongoose.model('consequences');

var conseqCtrl = function () { };

conseqCtrl.prototype.create = function (req, res) {
    var cdata = new Conseq(req.body);
    cdata.save(function (err, dta) {
        if (err) {
            console.log('error occured..' + err);
        }
        else {
            res.json(dta);
        }
    });
}

conseqCtrl.prototype.list = function (req, res) {
    Conseq.find().populate('gamesettings').populate({
        path: 'teamfaults.type',
        model: 'sportfouls'
    }).exec(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

conseqCtrl.prototype.getbyid = function (req, res) {
    Conseq.find({ _id: req.params.id }).populate('gamesettings').populate({
        path: 'teamfaults.type',
        model: 'sportfouls'
    }).exec(function (err, gdt) {
        if (err) console.log('error occured..' + err);
        res.json(gdt);
    });
}

conseqCtrl.prototype.getbysetting = function (req, res) {
    Conseq.find({ gamesettings: req.params.id }).populate('gamesettings').populate({
        path: 'teamfaults.type',
        model: 'sportfouls'
    }).exec(function (err, gd) {
        if (err) console.log('error occured..' + err);
        res.json(gd);
    });
}

conseqCtrl.prototype.update = function (req, res) {
    var updateObject = req.body;
    Conseq.update({ _id: req.params.id }, { $set: updateObject }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

conseqCtrl.prototype.delete = function (req, res) {
    Conseq.findByIdAndRemove({ _id: req.params.id }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}


module.exports = new conseqCtrl();
