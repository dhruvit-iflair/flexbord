/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
var Users = mongoose.model('users');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var path = require('path');
var settings = require('../../config/config.js');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: settings.host,
    port: settings.mailPort,
    secure: false,
    auth: {
        user: settings.Imailer,
        pass: settings.mailToken
    }
});
var rand, mailOpt, host, link;
function firevmail(reqdata) {
    rand = Math.floor((Math.random() * 100) + 8157927);
    host = reqdata.get('host');
    link = "http://" + host + "/api/users/verify?id=" + rand + '&email=' + reqdata.body.username;

    var mailOptions = {
        from: settings.fromImailer,
        to: reqdata.body.username,
        subject: 'Verification mail!!!',
        //text: 'That was easy!'
        html: '<h1>Hello!  ' + reqdata.body.username + ' !!</h1><br><br><br><a href=' + link + '>Click here to Verify your account!</a>'
    };
    mailOpt = mailOptions;
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

var usersctrl = function () { };
var imgdata;
usersctrl.prototype.create = function (req, res) {
    var bodydata = {
        username: req.body.username,
        // person_photo: imgdata,
        // roles:req.body.role,
        isAgreemented: req.body.isAgreemented,
        isVerified: 'false'
    }
    Users.register(new Users(bodydata), req.body.password, function (err, account) {
        if (err) {
            res.json(err.message);
        }
        else {
            passport.authenticate('local')(req, res, function () {
                //res.json('User Registered Successfully.');
                firevmail(req);
                res.json('User Registered Successfully.Please Verify your account to Login.');
            });
        }
    });
}

usersctrl.prototype.verify = function (req, res, next) {
    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
        console.log("Domain is matched. Information is from Authentic email");
        if (req.query.id == rand) {
            console.log("email is verified");
            var updateObject = { isVerified: 'true' };
            Users.findOneAndUpdate({ username: req.query.email }, { $set: updateObject }, function (er, dt) {
                if (er) {
                    console.log('error occured..' + er);
                }
                else {
                    //return res.json(dt);setTimeout("window.location.href='http://192.168.1.101:4200'",5000);
                    res.end("<h1>Email " + mailOpt.to + " is been successfully verified.<script>setTimeout('window.location.href=`"+req.headers.origin+"`',500);</script>");
                }
            });
        }
        else {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    }
    else {
        res.end("<h1>Request is from unknown source");
    }
}

usersctrl.prototype.upload = function (req, res, next) {
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, path.join(__dirname, '../../uploads'));
        },
        filename: function (req, file, callback) {
            var ext = file.originalname.split('.');
            imgdata = Date.now() + '.' + ext[1];
            callback(null, imgdata);
        }
    });

    var upload = multer({ storage: storage }).single('person_photo');
    upload(req, res, function (err) {
        if (err) {
            console.log('Error Occured' + err);
            return;
        }
        else {
            res.json(imgdata);
            next();
        }
    });
}

usersctrl.prototype.list = function (req, res) {
    Users.find().populate('roles').exec(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}
usersctrl.prototype.getbyuser = function (req, res) {
    Users.find({ _id: req.params.id }).populate('roles').exec(function (err, usrrs) {
        if (err) console.log('error occured..' + err);
        res.json(usrrs);
    });
}

usersctrl.prototype.update = function (req, res) {
    var updateObject = req.body;
    Users.update({ _id: req.params.id }, { $set: updateObject }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

usersctrl.prototype.resetpwd = function (req, res) {
    Users.findByUsername(req.body.username).then(function (sanitizedUsr) {
        if (sanitizedUsr) {
            var ptoken = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
            var expDate = Date.now() + 3600000;//1 hour time since generation
            var updateObject = { resetpwdToken: ptoken, resetpwdExpiredOn: expDate };
            Users.findOneAndUpdate({ username: req.body.username }, { $set: updateObject }, function (er, dt) {
                if (er) {
                    console.log('error occured..' + er);
                }
                else {
                    var hoster = req.headers.origin + "/setpassword?ref=" + ptoken;
                    var mailOptions = {
                        from: settings.fromImailer,
                        to: req.body.username,
                        subject: 'Reset Password!',
                        html: '<h1>Hello!  ' + req.body.username + ' !!</h1><br><br><br><a href=' + hoster + '>Click here to set your new password.</a>'
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    res.json('Verified your account successfully.');
                }
            });
        }
        else {
            res.json('This User does not exist!');
        }
    }, function (errpt) {
        console.log(errpt);
    });
}

usersctrl.prototype.checkexplink = function (req, res) {
    Users.find({ resetpwdToken: req.body.username }).exec(function (err, usrrsdata) {
        if(err){
            console.log(err);
            res.json(err);
        }
        if (usrrsdata[0] && usrrsdata[0].resetpwdExpiredOn < Date.now()) {
            res.json('Your Password Reset Link Expired');
        }
        else{
            res.json('Your Password Reset Link Already Used/Expired');
        }
    });
}

usersctrl.prototype.setnewpwd = function (req, res) {
    Users.find({ resetpwdToken: req.body.username }).exec(function (err, usrrsdata) {
        if (err) console.log('error occured..' + err);
        if (usrrsdata[0].resetpwdExpiredOn < Date.now()) {
            res.json('Your Password Reset Link Expired');
        }
        else {
            Users.findByUsername(usrrsdata[0].username).then(function (sanitizedUsr) {
                var npd = req.body.npd;
                if (sanitizedUsr) {
                    sanitizedUsr.setPassword(npd, function () {
                        sanitizedUsr.save();
                        var updateObject = { resetpwdToken: '', resetpwdExpiredOn: '' };
                        Users.findOneAndUpdate({ username: usrrsdata[0].username }, { $set: updateObject }, function (er, dt) {
                            if (er) {
                                console.log('error occured..' + er);
                            }
                            res.json('Password Reset Successfully.');
                        });
                    });
                }
                else {
                    res.json('This User does not exist!');
                }
            }, function (errpt) {
                console.log(errpt);
            });
        }
    });
}

usersctrl.prototype.delete = function (req, res) {
    Users.findByIdAndRemove({ _id: req.params.id }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(Users.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    Users.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = new usersctrl();
