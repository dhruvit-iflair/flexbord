/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
var SptStatus = mongoose.model('sportplayerstatus');

var sptstatusCtrl = function () { };


sptstatusCtrl.prototype.create = function (req, res) {
    var urole = new SptStatus(req.body);
    urole.save(function (err, dta) {
        if (err) {
            console.log('error occured..' + err);
        }
        else {
            res.json(dta);
        }
    });
}

sptstatusCtrl.prototype.list = function (req, res) {
    SptStatus.find(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

sptstatusCtrl.prototype.getbyid = function (req, res) {
    SptStatus.find({ _id: req.params.id }).exec(function (err, gdt) {
        if (err) console.log('error occured..' + err);
        res.json(gdt);
    });
}

sptstatusCtrl.prototype.getbysport = function (req, res) {
    SptStatus.find({ sports: req.params.id }).exec(function (err, gd) {
        if (err) console.log('error occured..' + err);
        res.json(gd);
    });
}

sptstatusCtrl.prototype.update = function (req, res) {
    var updateObject = req.body;
    SptStatus.update({ _id: req.params.id }, { $set: updateObject }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

sptstatusCtrl.prototype.delete = function (req, res) {
    SptStatus.findByIdAndRemove({ _id: req.params.id }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

module.exports = new sptstatusCtrl();
