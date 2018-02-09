/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
var Plist = mongoose.model('playlists');
var multer = require('multer');
var path = require('path');

var PlistCtrl = function () { };

PlistCtrl.prototype.create = function (req, res) {
    var cdata = new Plist(req.body);
    cdata.save(function (err, dta) {
        if (err) {
            console.log('error occured..' + err);
        }
        else {
            res.json(dta);
        }
    });
}

PlistCtrl.prototype.list = function (req, res) {
    Plist.find().populate('gamesettings').exec(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

PlistCtrl.prototype.getbyid = function (req, res) {
    Plist.find({ _id: req.params.id }).populate('gamesettings').exec(function (err, gdt) {
        if (err) console.log('error occured..' + err);
        res.json(gdt);
    });
}

PlistCtrl.prototype.getbysetting = function (req, res) {
    Plist.find({ gamesettings: req.params.id }).populate('gamesettings').exec(function (err, gd) {
        if (err) console.log('error occured..' + err);
        res.json(gd);
    });
}

PlistCtrl.prototype.update = function (req, res) {
    var updateObject = req.body;
    Plist.update({ _id: req.params.id }, { $set: updateObject }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

PlistCtrl.prototype.delete = function (req, res) {
    Plist.findByIdAndRemove({ _id: req.params.id }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

PlistCtrl.prototype.upload = function (req, res, next) {
  var itemMedia;
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, path.join(__dirname, '../../uploads/playlists'));
        },
        filename: function (req, file, callback) {
            var ext = file.originalname.split('.');
            itemMedia = Date.now() + '.' + ext[1];
            callback(null, itemMedia);
        }
    });

    var upload = multer({ storage: storage }).single('itemMedia');
    upload(req, res, function (err) {
        if (err) {
            console.log('Error Occured' + err);
            return;
        }
        else {
            res.json(itemMedia);
            next();
        }
    });
}

module.exports = new PlistCtrl();
