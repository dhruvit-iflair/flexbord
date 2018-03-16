/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
var GameSetting = mongoose.model('gamesettings');

var GameSettingsCtrl = function () { };


GameSettingsCtrl.prototype.create = function (req, res) {
    if (req.body.settings==""){
        req.body.settings="123456789012345678901234";
    }
    var urole = new GameSetting(req.body);
    urole.save(function (err, dta) {
        if (err) {
            console.log('error occured..' + err);
        }
        else {
            res.json(dta);
        }
    });
}

GameSettingsCtrl.prototype.list = function (req, res) {
    GameSetting.find().populate('sports').populate({
        path: 'settings',
        model: 'gamesettings'
    }).exec(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

GameSettingsCtrl.prototype.getbyid = function (req, res) {
    GameSetting.find({ _id: req.params.id }).populate('sports').populate({
        path: 'settings',
        model: 'gamesettings'
    }).exec(function (err, gdt) {
        if (err) console.log('error occured..' + err);
        res.json(gdt);
    });
}

GameSettingsCtrl.prototype.update = function (req, res) {
    if (req.body.settings==""){
        req.body.settings="123456789012345678901234";
    }
    var updateObject = req.body;
    GameSetting.update({ _id: req.params.id }, { $set: updateObject }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

GameSettingsCtrl.prototype.delete = function (req, res) {
    GameSetting.findByIdAndRemove({ _id: req.params.id }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

module.exports = new GameSettingsCtrl();
