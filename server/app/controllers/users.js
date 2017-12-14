/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
var Users = mongoose.model('users');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var path = require('path');
var nodemailer = require('nodemailer');
var rand, mailOpt, host, link;
function firemail(reqdata) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hardiktestmail24@gmail.com',
            pass: 'hardiktest'
        }
    });
    rand = Math.floor((Math.random() * 100) + 54);
    host = reqdata.get('host');
    link = "http://" + host + "/api/users/verify?id=" + rand+'&email='+reqdata.body.username;

    var mailOptions = {
        from: 'hardiktestmail24@gmail.com',
        to: reqdata.body.username,
        subject: 'Sending Email using Node.js',
        //text: 'That was easy!'
        html: '<h1>Welcome Folks!!</h1><br><br><a href=' + link + '>Click here to Verify your account!</a>'
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
                firemail(req);
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
             var updateObject = {isVerified:'true'};
             Users.findOneAndUpdate({username:req.query.email},{ $set: updateObject }, function (er, dt) {
                if (er) {
                    console.log('error occured..' + er);
                }
                else {
                    //return res.json(dt);
                    res.end("<h1>Email " + mailOpt.to + " is been successfully verified.");
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
