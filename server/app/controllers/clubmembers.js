/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose = require('mongoose');
var ClubMembers = mongoose.model('clubMembers');
var multer = require('multer');
var path = require('path');

var clubMembersCtrl = function () { };
var photo;

clubMembersCtrl.prototype.create = function (req, res) {
    var clubMem=new ClubMembers(req.body);
    clubMem.save(function(err,dta){
        if(err){
            console.log('error occured..'+err);
        }
        else{
            res.json(dta);
        }
    });
}


clubMembersCtrl.prototype.getbyclub = function (req, res) {
    ClubMembers.find({ club: req.params.id }).populate('club').exec(function (err, gd) {
        if (err) console.log('error occured..' + err);
        res.json(gd);
    });
}
clubMembersCtrl.prototype.photo = function (req, res, next) {
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, path.join(__dirname, '../../uploads/clubMembersPhoto'));
        },
        filename: function (req, file, callback) {
            var ext = file.originalname.split('.');
            photo = Date.now() + '.' + ext[1];
            callback(null, photo);
        }
    });

    var upload = multer({ storage: storage }).single('photo');
    upload(req, res, function (err) {
        if (err) {
            console.log('Error Occured' + err);
            return;
        }
        else {
            res.json(photo);
            next();
        }
    });
}

clubMembersCtrl.prototype.list = function (req, res) {
    ClubMembers.find().populate('club').exec(function (er, dt) {
            if (er) {
                console.log('error occured..' + er);
            }
            else {
                return res.json(dt);
            }
        });
}

clubMembersCtrl.prototype.getbyid = function (req, res) {
    ClubMembers.find({_id:req.params.id}).populate('club').exec(function (err, usrrs) {
        if (err) console.log('error occured..' + err);
        res.json(usrrs); 
    });
}

clubMembersCtrl.prototype.update = function (req, res) {
    ClubMembers.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},function (er, dt) {
            if (er) {
                console.log('error occured..' + er);
            }
            else {
                return res.json(dt);
            }
        });
}
clubMembersCtrl.prototype.stateP = function (req, res) {  
        ClubMembers.findByIdAndUpdate(req.params.id,{"status":"Pending"},function (er, dt) {
            if (er) {
                console.log('error occured..' + er);
            }
            else {
                return res.json(dt);
            }
        });    
}
clubMembersCtrl.prototype.stateA = function (req, res) {  
        ClubMembers.findByIdAndUpdate(req.params.id,{"status":"Approved"},function (er, dt) {
            if (er) {
                console.log('error occured..' + er);
            }
            else {
                return res.json(dt);
            }
        });     
}
clubMembersCtrl.prototype.delete = function (req, res) {
    ClubMembers.findByIdAndRemove({_id:req.params.id},function (er, dt) {
            if (er) {
                console.log('error occured..' + er);
            }
            else {
                return res.json(dt);
            }
        });
}

module.exports = new clubMembersCtrl();
