/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
var SptPnt = mongoose.model('sportpoints');

var orgmemsctrl = function () { };


orgmemsctrl.prototype.create = function (req, res) {
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

orgmemsctrl.prototype.list = function (req, res) {
    SptPnt.find(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

orgmemsctrl.prototype.getbyid = function (req, res) {
    SptPnt.find({ _id: req.params.id }).exec(function (err, gdt) {
        if (err) console.log('error occured..' + err);
        res.json(gdt);
    });
}

orgmemsctrl.prototype.getbysport = function (req, res) {
    SptPnt.find({ sports: req.params.id }).exec(function (err, gd) {
        if (err) console.log('error occured..' + err);
        res.json(gd);
    });
}

orgmemsctrl.prototype.update = function (req, res) {
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

orgmemsctrl.prototype.delete = function (req, res) {
    SptPnt.findByIdAndRemove({ _id: req.params.id }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

module.exports = new orgmemsctrl();
