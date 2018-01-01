/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose = require('mongoose');
var Organizer = mongoose.model('organizer');
var multer = require('multer');
var path = require('path');

var organizerCtrl = function () { };
var placePic;
var logo;

organizerCtrl.prototype.create = function (req, res) {
    var org=new Organizer(req.body);
    org.save(function(err,dta){
        if(err){
            console.log('error occured..'+err);
        }
        else{
            res.json(dta);
        }
    });
}

organizerCtrl.prototype.upload = function (req, res, next) {
    var list = [];
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, path.join(__dirname, '../../uploads'));
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
organizerCtrl.prototype.logo = function (req, res, next) {
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, path.join(__dirname, '../../uploads'));
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

organizerCtrl.prototype.list = function (req, res) {
    Organizer.find(function (er, dt) {
            if (er) {
                console.log('error occured..' + er);
            }
            else {
                return res.json(dt);
            }
        });
}

organizerCtrl.prototype.getbyid = function (req, res) {
    Organizer.find({_id:req.params.id}).exec(function (err, usrrs) {
        if (err) console.log('error occured..' + err);
        res.json(usrrs); 
    });
}

organizerCtrl.prototype.update = function (req, res) {
    Organizer.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},function (er, dt) {
            if (er) {
                console.log('error occured..' + er);
            }
            else {
                return res.json(dt);
            }
        });
}

organizerCtrl.prototype.delete = function (req, res) {
    Organizer.findByIdAndRemove({_id:req.params.id},function (er, dt) {
            if (er) {
                console.log('error occured..' + er);
            }
            else {
                return res.json(dt);
            }
        });
}

module.exports = new organizerCtrl();
