/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
var SptPnt = mongoose.model('sportscores');

var scoresCtrl = function () { };


scoresCtrl.prototype.create = function (req, res) {
    var urole = new SptPnt(req.body);
    urole.save(function (err, dta) {
        if (err) {
            console.log('error occured..' + err);
        }
        else {
            res.json(dta);
        }
    });
}

scoresCtrl.prototype.list = function (req, res) {
    SptPnt.find(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

scoresCtrl.prototype.getbyid = function (req, res) {
    SptPnt.find({ _id: req.params.id }).exec(function (err, gdt) {
        if (err) console.log('error occured..' + err);
        res.json(gdt);
    });
}

scoresCtrl.prototype.getbysport = function (req, res) {
    SptPnt.find({ sports: req.params.id }).exec(function (err, gd) {
        if (err) console.log('error occured..' + err);
        res.json(gd);
    });
}

scoresCtrl.prototype.update = function (req, res) {
    var updateObject = req.body;
    SptPnt.update({ _id: req.params.id }, { $set: updateObject }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

scoresCtrl.prototype.delete = function (req, res) {
    SptPnt.findByIdAndRemove({ _id: req.params.id }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

module.exports = new scoresCtrl();
