/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
var ClubTeams = mongoose.model('clubteams');
var multer = require('multer');
var path = require('path');

var clubteamsCtrl = function () { };

var logo;
clubteamsCtrl.prototype.create = function (req, res) {
    var cdata = new ClubTeams(req.body);
    cdata.save(function (err, dta) {
        if (err) {
            console.log('error occured..' + err);
        }
        else {
            res.json(dta);
        }
    });
}

clubteamsCtrl.prototype.list = function (req, res) {
    ClubTeams.find().populate('sports').exec(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

clubteamsCtrl.prototype.getbyid = function (req, res) {
    ClubTeams.find({ _id: req.params.id }).exec(function (err, gdt) {
        if (err) console.log('error occured..' + err);
        res.json(gdt);
    });
}

clubteamsCtrl.prototype.getbyclub = function (req, res) {
    ClubTeams.find({ club: req.params.id }).populate('sports').exec(function (err, gd) {
        if (err) console.log('error occured..' + err);
        res.json(gd);
    });
}

clubteamsCtrl.prototype.update = function (req, res) {
    var updateObject = req.body;
    ClubTeams.update({ _id: req.params.id }, { $set: updateObject }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

clubteamsCtrl.prototype.delete = function (req, res) {
    ClubTeams.findByIdAndRemove({ _id: req.params.id }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

clubteamsCtrl.prototype.logo = function (req, res, next) {
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, path.join(__dirname, '../../uploads/clubteamlogos'));
        },
        filename: function (req, file, callback) {
            var ext = file.originalname.split('.');
            logo = Date.now() + '.' + ext[1];
            callback(null, logo);
        }
    });

    var upload = multer({ storage: storage }).single('logo');
    upload(req, res, function (err) {
        if (err) {
            console.log('Error Occured' + err);
            return;
        }
        else {
            res.json(logo);
            next();
        }
    });
}

module.exports = new clubteamsCtrl();
