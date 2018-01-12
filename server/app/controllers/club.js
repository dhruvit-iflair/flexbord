/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose = require('mongoose');
var Club = mongoose.model('club');
var multer = require('multer');
var path = require('path');

var clubCtrl = function () { };
var placePic;
var logo;

clubCtrl.prototype.create = function (req, res) {
    var club=new Club(req.body);
    club.save(function(err,dta){
        if(err){
            console.log('error occured..'+err);
        }
        else{
            res.json(dta);
        }
    });
}

clubCtrl.prototype.upload = function (req, res, next) {
    var list = [];
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, path.join(__dirname, '../../uploads/clubplacepics'));
        },
        filename: function (req, file, callback) {
            var ext = file.originalname.split('.');
            placePic = Date.now() + '.' + ext[1];
            list.push(placePic);
            callback(null, placePic);
        }
    });
    var upload = multer({ storage: storage }).array("placePic",10);
    upload(req, res, function (err) {
        if (err) {
            console.log('Error Occured' + err);
            return;
        }
        else {
            res.json(list);
            next();
        }
    });
}
clubCtrl.prototype.logo = function (req, res, next) {
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, path.join(__dirname, '../../uploads/clublogos'));
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

clubCtrl.prototype.list = function (req, res) {
    Club.find(function (er, dt) {
            if (er) {
                console.log('error occured..' + er);
            }
            else {
                return res.json(dt);
            }
        });
}

clubCtrl.prototype.getbyid = function (req, res) {
    Club.find({_id:req.params.id}).exec(function (err, usrrs) {
        if (err) console.log('error occured..' + err);
        res.json(usrrs); 
    });
}

clubCtrl.prototype.update = function (req, res) {
    Club.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},function (er, dt) {
            if (er) {
                console.log('error occured..' + er);
            }
            else {
                return res.json(dt);
            }
        });
}

clubCtrl.prototype.delete = function (req, res) {
    Club.findByIdAndRemove({_id:req.params.id},function (er, dt) {
            if (er) {
                console.log('error occured..' + er);
            }
            else {
                return res.json(dt);
            }
        });
}

module.exports = new clubCtrl();
