/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
var Games = mongoose.model('games');

var gamesCtrl = function () { };


gamesCtrl.prototype.create = function (req, res) {
    var urole = new Games(req.body);
    urole.save(function (err, dta) {
        if (err) {
            console.log('error occured..' + err);
        }
        else {
            res.json(dta);
        }
    });
}

gamesCtrl.prototype.list = function (req, res) {
    Games.find().populate({
        path: 'hometeam',
        model: 'clubteams',
        populate: {
            path: 'club',
            model: 'club'
        }
    }).populate({
        path: 'visitorteam',
        model: 'clubteams',
        populate: {
            path: 'club',
            model: 'club'
        }
    }).exec(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

gamesCtrl.prototype.getbyid = function (req, res) {
    Games.find({ _id: req.params.id }).populate({
        path: 'hometeam',
        model: 'clubteams',
        populate: {
            path: 'club',
            model: 'club'
        }
    }).populate({
        path: 'visitorteam',
        model: 'clubteams',
        populate: {
            path: 'club',
            model: 'club'
        }
    }).exec(function (err, gdt) {
        if (err) console.log('error occured..' + err);
        res.json(gdt);
    });
}

gamesCtrl.prototype.update = function (req, res) {
    var updateObject = req.body;
    Games.update({ _id: req.params.id }, { $set: updateObject }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

gamesCtrl.prototype.delete = function (req, res) {
    Games.findByIdAndRemove({ _id: req.params.id }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

module.exports = new gamesCtrl();
