/*
Created By : Nasiruddin Saiyed(nasiruddin.saiyed@iflair.com)
*/

var mongoose = require('mongoose');
var ClubMembers = mongoose.model('clubMembers');
var multer = require('multer');
var path = require('path');
var csv = require("csvtojson");
const json2csv = require('json2csv');
const fs = require('fs');
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
clubMembersCtrl.prototype.import = function (req, res) {
    var cs,file;
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, path.join(__dirname, '../../uploads/csv'));
        },
        filename: function (req, file, callback) {
            var ext = file.originalname.split('.');
            cs = "../../uploads/csv/" + Date.now() + '.' + ext[1];
            // logo = file;        
            callback(null, cs);
        }
    });

    var upload = multer({ 
        storage: storage,
        fileFilter: function (req, file, callback) {
            if (path.extname(file.originalname) !== '.csv') {
                return res.status(400).send({
                    message: ' (=’.’=) , (-_(-_(-_(-_-)_-)_-)_-) Looks like a gang of error comming!!    '
                 });
              return callback(new Error('Only csv are allowed'))
            }        
            callback(null, true)
        }
    }).single('csv');
    upload(req, res, function (err) {
        if (err) {
            console.log('Error Occured' + err);
            return;
        }
        else {
            var data = [];
            csv()
                .fromFile(req.file.path)
                .on('csv',(csvRow)=>{
                    data.push({
                        "firstname" :       csvRow[0],
                        "lastname" :        csvRow[1],
                        "gender" :          csvRow[2],
                        "license" :         csvRow[3],
                        "dob" :             csvRow[4],
                        "photo" :           csvRow[5],
                        "memberSince" :     csvRow[6],
                        "address" :         csvRow[7],
                        "street" :          csvRow[8],
                        "country" :         csvRow[9],
                        "state" :           csvRow[10],
                        "city" :            csvRow[11],
                        "zipcode" :         csvRow[12],
                        "email" :           csvRow[13],
                        "phonenumber" :     csvRow[14],
                        "usertype" :        csvRow[15],
                        "status" :          csvRow[16],
                        "club" :            req.body.club,
                    })
                })
                .on('done',()=>{
                    ClubMembers.insertMany(data, (err, docs) => {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.status(200).send("Imported Successfully");                            
                        }
                    })
                })
        }
    });
}

clubMembersCtrl.prototype.csvDemo = function (req,  res){
    var fields = [ "firstname" ,"lastname" ,"gender" ,"license" ,"dob" ,"photo" ,"memberSince" ,"address" ,"street" ,"country" ,"state" ,"city" ,"zipcode" ,"email" ,"phonenumber" ,"usertype" ,"status" ,"club" ];
    var myCars = [
    {
        "firstname" : "Test1",
        "lastname" : "w",
        "gender" : "female",
        "license" : "123123123",
        "dob" : "2017-06-06",
        "photo" : "1515841455271.png",
        "memberSince" : "2018-01-13",
        "address" : "Paldi, Ahmedabad, Gujarat, India",
        "street" : "sddd",
        "country" : "India",
        "state" : "Gujarat",
        "city" : "Ahmedabad",
        "zipcode" : "380007",
        "email" : "www1@www.com",
        "phonenumber" : "9875640123",
        "usertype" : "b",
        "status" : "Approved",
        "club" : "5a58c23b734cc840baf2f34c",
    }, 
    {
        "firstname" : "Test12",
        "lastname" : "w",
        "gender" : "female",
        "license" : "123123123",
        "dob" : "2017-06-06",
        "photo" : "1515841455271.png",
        "memberSince" : "2018-01-13",
        "address" : "Paldi, Ahmedabad, Gujarat, India",
        "street" : "sddd",
        "country" : "India",
        "state" : "Gujarat",
        "city" : "Ahmedabad",
        "zipcode" : "380007",
        "email" : "www2@www.com",
        "phonenumber" : "9875640123",
        "usertype" : "b",
        "status" : "Pending",
        "club" : "5a58c23b734cc840baf2f34c",        
    }, 
    {
        "firstname" : "Test123",
        "lastname" : "w",
        "gender" : "female",
        "license" : "123123123",
        "dob" : "2017-06-06",
        "photo" : "1515841455271.png",
        "memberSince" : "2018-01-13",
        "address" : "Paldi, Ahmedabad, Gujarat, India",
        "street" : "sddd",
        "country" : "India",
        "state" : "Gujarat",
        "city" : "Ahmedabad",
        "zipcode" : "380007",
        "email" : "www3@www.com",
        "phonenumber" : "9875640123",
        "usertype" : "b",
        "status" : "Approved",
        "club" : "5a58c23b734cc840baf2f34c",
    }
    ];
    var csv = json2csv({ data: myCars, fields: fields });
    fs.writeFile('uploads/csv/ClubMembers.csv', csv, function(err) {
        if (err) console.log(err);
        res.download(path.join(__dirname + '../../../uploads/csv/ClubMembers.csv'),"ClubMembers.csv");
    });
}
module.exports = new clubMembersCtrl();
