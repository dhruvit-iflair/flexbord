/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose = require('mongoose');
var ClubClassifications = mongoose.model('clubClassifications');
var multer = require('multer');
var path = require('path');

var clubClassificationsCtrl = function () { };

clubClassificationsCtrl.prototype.create = function (req, res) {
    var clubC=new ClubClassifications(req.body);
    clubC.save(function(err,dta){
        if(err){
            console.log('error occured..'+err);
        }
        else{
            res.json(dta);
        }
    });
}

clubClassificationsCtrl.prototype.list = function (req, res) {
    ClubClassifications.find(function (er, dt) {
            if (er) {
                console.log('error occured..' + er);
            }
            else {
                return res.json(dt);
            }
        });
}

clubClassificationsCtrl.prototype.getbyid = function (req, res) {
    ClubClassifications.find({_id:req.params.id}).exec(function (err, usrrs) {
        if (err) console.log('error occured..' + err);
        res.json(usrrs); 
    });
}

clubClassificationsCtrl.prototype.getbyclub = function (req, res) {
    ClubClassifications.find({ club: req.params.id }).exec(function (err, gd) {
        if (err) console.log('error occured..' + err);
        res.json(gd);
    });
}

clubClassificationsCtrl.prototype.update = function (req, res) {
    ClubClassifications.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},function (er, dt) {
            if (er) {
                console.log('error occured..' + er);
            }
            else {
                return res.json(dt);
            }
        });
}

clubClassificationsCtrl.prototype.delete = function (req, res) {
    ClubClassifications.findByIdAndRemove({_id:req.params.id},function (er, dt) {
            if (er) {
                console.log('error occured..' + er);
            }
            else {
                return res.json(dt);
            }
        });
}

module.exports = new clubClassificationsCtrl();
