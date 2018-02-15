/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
var Struct = mongoose.model('structures');

var structCtrl = function () { };

structCtrl.prototype.create = function (req, res) {
    var cdata = new Struct(req.body);
    cdata.save(function (err, dta) {
        if (err) {
            console.log('error occured..' + err);
        }
        else {
            res.json(dta);
        }
    });
}

structCtrl.prototype.list = function (req, res) {
    Struct.find().populate('gamesettings').exec(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

structCtrl.prototype.getbyid = function (req, res) {
    Struct.find({ _id: req.params.id }).populate('gamesettings').exec(function (err, gdt) {
        if (err) console.log('error occured..' + err);
        res.json(gdt);
    });
}

structCtrl.prototype.getbysetting = function (req, res) {
    Struct.find({ gamesettings: req.params.id }).populate('gamesettings').exec(function (err, gd) {
        if (err) console.log('error occured..' + err);
        res.json(gd);
    });
}

structCtrl.prototype.update = function (req, res) {
    var updateObject = req.body;
    Struct.update({ _id: req.params.id }, { $set: updateObject }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

structCtrl.prototype.delete = function (req, res) {
    Struct.findByIdAndRemove({ _id: req.params.id }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}


module.exports = new structCtrl();
