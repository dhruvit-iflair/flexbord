/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose = require('mongoose');
var OrganizerClassifications = mongoose.model('organizerClassifications');
var multer = require('multer');
var path = require('path');

var organizerClassificationsCtrl = function () { };

organizerClassificationsCtrl.prototype.create = function (req, res) {
    var org=new OrganizerClassifications(req.body);
    org.save(function(err,dta){
        if(err){
            console.log('error occured..'+err);
        }
        else{
            res.json(dta);
        }
    });
}

organizerClassificationsCtrl.prototype.list = function (req, res) {
    OrganizerClassifications.find(function (er, dt) {
            if (er) {
                console.log('error occured..' + er);
            }
            else {
                return res.json(dt);
            }
        });
}

organizerClassificationsCtrl.prototype.getbyid = function (req, res) {
    OrganizerClassifications.find({_id:req.params.id}).exec(function (err, usrrs) {
        if (err) console.log('error occured..' + err);
        res.json(usrrs); 
    });
}

organizerClassificationsCtrl.prototype.getbyorg = function (req, res) {
    OrganizerClassifications.find({ organizer: req.params.id }).exec(function (err, gd) {
        if (err) console.log('error occured..' + err);
        res.json(gd);
    });
}

organizerClassificationsCtrl.prototype.update = function (req, res) {
    OrganizerClassifications.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},function (er, dt) {
            if (er) {
                console.log('error occured..' + er);
            }
            else {
                return res.json(dt);
            }
        });
}

organizerClassificationsCtrl.prototype.delete = function (req, res) {
    OrganizerClassifications.findByIdAndRemove({_id:req.params.id},function (er, dt) {
            if (er) {
                console.log('error occured..' + er);
            }
            else {
                return res.json(dt);
            }
        });
}

module.exports = new organizerClassificationsCtrl();
