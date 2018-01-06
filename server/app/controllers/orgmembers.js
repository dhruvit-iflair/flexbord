/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
var OrgMems = mongoose.model('orgmembers');

var orgmemsctrl = function () { };


orgmemsctrl.prototype.create = function (req, res) {
    var urole = new OrgMems(req.body);
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
    OrgMems.find(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

orgmemsctrl.prototype.getbyid = function (req, res) {
    OrgMems.find({ _id: req.params.id }).exec(function (err, gdt) {
        if (err) console.log('error occured..' + err);
        res.json(gdt);
    });
}

orgmemsctrl.prototype.getbyorg = function (req, res) {
    OrgMems.find({ organizer: req.params.id }).exec(function (err, gd) {
        if (err) console.log('error occured..' + err);
        res.json(gd);
    });
}

orgmemsctrl.prototype.update = function (req, res) {
    var updateObject = req.body;
    OrgMems.update({ _id: req.params.id }, { $set: updateObject }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

orgmemsctrl.prototype.delete = function (req, res) {
    OrgMems.findByIdAndRemove({ _id: req.params.id }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

module.exports = new orgmemsctrl();
