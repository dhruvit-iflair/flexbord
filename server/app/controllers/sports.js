/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
var Sports = mongoose.model('sports');
var SportsScore = mongoose.model('sportscores');

var sportsCtrl = function () { };

sportsCtrl.prototype.create = function (req, res) {
    var urole = new Sports(req.body);
    urole.save(function (err, dta) {
        if (err) {
            console.log('error occured..' + err);
        }
        else {
            // res.json(dta);
            var defaultScores = {wins: 0,draws: 0,losses: 0,sports: dta._id,};
            SportsScore.create(defaultScores,function(ers,babu){
                if(ers){console.log('error occured while set scores..'+ers);}
                else{res.json(dta);}
            });
        }
    });
}

sportsCtrl.prototype.list = function (req, res) {
    Sports.find(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

sportsCtrl.prototype.getbyid = function (req, res) {
    Sports.find({ _id: req.params.id }).exec(function (err, gdt) {
        if (err) console.log('error occured..' + err);
        res.json(gdt);
    });
}

sportsCtrl.prototype.update = function (req, res) {
    var updateObject = req.body;
    Sports.update({ _id: req.params.id }, { $set: updateObject }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

sportsCtrl.prototype.delete = function (req, res) {
    Sports.findByIdAndRemove({ _id: req.params.id }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

module.exports = new sportsCtrl();
