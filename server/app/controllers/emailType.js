/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose = require('mongoose');
var emailType = mongoose.model('emailType');

var emailTypeCtrl = function () { };

emailTypeCtrl.prototype.create = function (req, res) {
    var email=new emailType(req.body);
    email.save(function(err,dta){
        if(err){
            console.log('error occured..'+err);
        }
        else{
            res.json(dta);
        }
    });
}

emailTypeCtrl.prototype.list = function (req, res) {
    emailType.find(function (er, dt) {
            if (er) {
                console.log('error occured..' + er);
            }
            else {
                return res.json(dt);
            }
        });
}

emailTypeCtrl.prototype.getbyid = function (req, res) {
    emailType.find({_id:req.params.id}).exec(function (err, usrrs) {
        if (err) console.log('error occured..' + err);
        res.json(usrrs); 
    });
}

emailTypeCtrl.prototype.update = function (req, res) {
    emailType.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},function (er, dt) {
            if (er) {
                console.log('error occured..' + er);
            }
            else {
                return res.json(dt);
            }
        });
}

emailTypeCtrl.prototype.delete = function (req, res) {
    emailType.findByIdAndRemove({_id:req.params.id},function (er, dt) {
            if (er) {
                console.log('error occured..' + er);
            }
            else {
                return res.json(dt);
            }
        });
}

module.exports = new emailTypeCtrl();
