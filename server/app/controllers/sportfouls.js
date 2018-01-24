/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
var SptFl = mongoose.model('sportfouls');

var foulsCtrl = function () { };


foulsCtrl.prototype.create = function (req, res) {
    var urole = new SptFl(req.body);
    urole.save(function (err, dta) {
        if (err) {
            console.log('error occured..' + err);
        }
        else {
            res.json(dta);
        }
    });
}

foulsCtrl.prototype.list = function (req, res) {
    SptFl.find(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

foulsCtrl.prototype.getbyid = function (req, res) {
    SptFl.find({ _id: req.params.id }).exec(function (err, gdt) {
        if (err) console.log('error occured..' + err);
        res.json(gdt);
    });
}

foulsCtrl.prototype.getbysport = function (req, res) {
    SptFl.find({ sports: req.params.id }).exec(function (err, gd) {
        if (err) console.log('error occured..' + err);
        res.json(gd);
    });
}

foulsCtrl.prototype.update = function (req, res) {
    var updateObject = req.body;
    SptFl.update({ _id: req.params.id }, { $set: updateObject }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

foulsCtrl.prototype.delete = function (req, res) {
    SptFl.findByIdAndRemove({ _id: req.params.id }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

module.exports = new foulsCtrl();
