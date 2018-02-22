/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose = require('mongoose');
var Email = mongoose.model('email');
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

var emailCtrl = function () { };

emailCtrl.prototype.create = function (req, res) {
    var email=new Email(req.body);
    email.save(function(err,dta){
        if(err){
            console.log('error occured..'+err);
        }
        else{
            res.json(dta);
        }
    });
}

emailCtrl.prototype.list = function (req, res) {
    Email.find(function (er, dt) {
            if (er) {
                console.log('error occured..' + er);
            }
            else {
                return res.json(dt);
            }
        });
}

emailCtrl.prototype.getbyid = function (req, res) {
    Email.find({_id:req.params.id}).exec(function (err, usrrs) {
        if (err) console.log('error occured..' + err);
        res.json(usrrs); 
    });
}

emailCtrl.prototype.update = function (req, res) {
    Email.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},function (er, dt) {
            if (er) {
                console.log('error occured..' + er);
            }
            else {
                return res.json(dt);
            }
        });
}

emailCtrl.prototype.delete = function (req, res) {
    Email.findByIdAndRemove({_id:req.params.id},function (er, dt) {
            if (er) {
                console.log('error occured..' + er);
            }
            else {
                return res.json(dt);
            }
        });
}


emailCtrl.prototype.exterminate = function(title,pa){
    Email.find({'title': title}).exec(function (error,email) {
        if (error) console.log(error);
        if(email[0]){
            var mail = email[0];
            for (var keys in pa) {
                if (mail.content.indexOf('{{'+keys+'}}') > -1) {
                    mail.content = mail.content.toString().replace("{{"+keys+"}}",pa[keys]);    
                }                
            }
            var mailData = {
                from : mail.from,
                to   : pa.email,
                subject : mail.subject,
                content : mail.content,
                cc      : mail.cc.split(',')
            }
            regenerate(mailData);
        }
    })
}


function regenerate(data) {
    var mailOptions = {
        from: data.from,
        to: data.to,
        subject: data.subject,
        html: data.content,
        cc: data.cc
    };
    mailOpt = mailOptions;
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response + "To " + data.to);
        }
    });
}

module.exports = new emailCtrl();
