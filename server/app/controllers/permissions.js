/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
var Perms = mongoose.model('permissions');

var permsCtrl = function () { };


permsCtrl.prototype.create = function (req, res) {
    var noidea = new Perms(req.body);
    noidea.save(function (err, dta) {
        if (err) {
            console.log('error occured..' + err);
        }
        else {
            res.json(dta);
        }
    });
}

permsCtrl.prototype.list = function (req, res) {
    Perms.find().populate('roles').exec(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

permsCtrl.prototype.getbyid = function (req, res) {
    Perms.find({ _id: req.params.id }).populate('roles').exec(function (err, usrrs) {
        if (err) console.log('error occured..' + err);
        res.json(usrrs);
    });
}

permsCtrl.prototype.getbyrole = function (req, res) {
    Perms.find({ roles: req.params.id }).populate('roles').exec(function (err, permsd) {
        if (err) console.log('error occured..' + err);
        res.json(permsd);
    });
}

permsCtrl.prototype.update = function (req, res) {
    Perms.findByIdAndUpdate({ _id: req.params.id }, req.body, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

permsCtrl.prototype.updatebyrole = function (req, res) {
    Perms.findOneAndUpdate({ roles: req.params.id }, req.body, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

permsCtrl.prototype.delete = function (req, res) {
    Perms.findByIdAndRemove({ _id: req.params.id }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

module.exports = new permsCtrl();
