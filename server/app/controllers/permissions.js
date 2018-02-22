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
    Perms.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body },{new:true}, function (er, dt) {
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

permsCtrl.prototype.permissionUpdate = function () {
    var data = [{
        "_id" : "5a658c0e67d9d32f5439d49f",
        "permissions" : [
            { "Organizer" : [true,true,true,true] },
            { "OrganizerSeasons" : [true,true,true,true] },
            { "OrganizerMembers" : [true,true,true,true] },
            { "OrganizerClassifications" : [true,true,true,true] },
            { "OrganizerCompetitions" : [true,true,true,true] },
            { "Club" : [true,true,true,true] },
            { "ClubMembers" : [true,true,true,true] },
            { "ClubTeams" : [true,true,true,true] },
            { "ClubSeasons" : [true,true,true,true] },
            { "ClubClassifications" : [true,true,true,true] },
            { "Sport" : [false,false,false,false]},
            { "SportPoints" : [false,false,false,false]},
            { "SportPlayerstatus" : [false,false,false,false]},
            { "SportScores" : [false,true,false,true]},
            { "SportFouls" : [false,false,false,false]}, 
            { "Game" : [ true, true, true, true]}, 
            { "GameSetting" : [ true, true, true, true]}, 
            { "GameSettingTimeSetting" : [ true, true, true, true]}, 
            { "GameSettingStructure" : [ true, true, true, true]}, 
            { "GameSettingScoreboard" : [ true, true, true, true]}, 
            { "GameSettingConsequences" : [ true, true, true, true]}, 
            { "GameSettingPlaylist" : [ true, true, true, true]}
        ],
        "roles" : "5a65aa07a6ec3b72cc55d1ef",
        "__v" : 0
    },
    {
        "_id" : "5a5f20b276c6495fb37982cc",
        "permissions" : [
            { "Organizer" : [true,true,true,true] },
            { "OrganizerSeasons" : [true,true,true,true] },
            { "OrganizerMembers" : [true,true,true,true] },
            { "OrganizerClassifications" : [true,true,true,true] },
            { "OrganizerCompetitions" : [true,true,true,true] },
            { "Club" : [true,true,true,true] },
            { "ClubMembers" : [true,true,true,true] },
            { "ClubTeams" : [true,true,true,true] },
            { "ClubSeasons" : [true,true,true,true] },
            { "ClubClassifications" : [true,true,true,true] },
            { "Sport" : [false,false,false,false]},
            { "SportPoints" : [false,false,false,false]},
            { "SportPlayerstatus" : [false,false,false,false]},
            { "SportScores" : [false,true,false,true]},
            { "SportFouls" : [false,false,false,false]}, 
            { "Game" : [ true, true, true, true]}, 
            { "GameSetting" : [ true, true, true, true]}, 
            { "GameSettingTimeSetting" : [ true, true, true, true]}, 
            { "GameSettingStructure" : [ true, true, true, true]}, 
            { "GameSettingScoreboard" : [ true, true, true, true]}, 
            { "GameSettingConsequences" : [ true, true, true, true]}, 
            { "GameSettingPlaylist" : [ true, true, true, true]}
        ],
        "roles" : "5a65aa17a6ec3b72cc55d1f0",
        "__v" : 0
    },
    {
        "_id" : "5a65ac9fe68787d636609817",
        "permissions" : [
            { "Organizer" : [true,true,true,true] },
            { "OrganizerSeasons" : [true,true,true,true] },
            { "OrganizerMembers" : [true,true,true,true] },
            { "OrganizerClassifications" : [true,true,true,true] },
            { "OrganizerCompetitions" : [true,true,true,true] },
            { "Club" : [true,true,true,true] },
            { "ClubMembers" : [true,true,true,true] },
            { "ClubTeams" : [true,true,true,true] },
            { "ClubSeasons" : [true,true,true,true] },
            { "ClubClassifications" : [true,true,true,true] },
            { "Sport" : [false,false,false,false]},
            { "SportPoints" : [false,false,false,false]},
            { "SportPlayerstatus" : [false,false,false,false]},
            { "SportScores" : [false,true,false,true]},
            { "SportFouls" : [false,false,false,false]}, 
            { "Game" : [ true, true, true, true]}, 
            { "GameSetting" : [ true, true, true, true]}, 
            { "GameSettingTimeSetting" : [ true, true, true, true]}, 
            { "GameSettingStructure" : [ true, true, true, true]}, 
            { "GameSettingScoreboard" : [ true, true, true, true]}, 
            { "GameSettingConsequences" : [ true, true, true, true]}, 
            { "GameSettingPlaylist" : [ true, true, true, true]}
        ],
        "roles" : "5a65aa3ca6ec3b72cc55d1f1"
    }]
    for (let index = 0; index < data.length; index++) {
        const massPer = data[index];
        Perms.findByIdAndUpdate({ _id: massPer._id }, { $set: massPer },{new:true}, function (er, dt) {
            if (er) {
                console.log('error occured..' + er);
            }
            else {
                return console.log(dt);
            }
        });
    }
}
module.exports = new permsCtrl();
