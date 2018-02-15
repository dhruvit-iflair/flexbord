/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose = require('mongoose');
var OrgMems = mongoose.model('orgmembers');
var multer = require('multer');
var path = require('path');
// var csv = require("fast-csv");
var csv = require("csvtojson");
const json2csv = require('json2csv');
const fs = require('fs');

var orgmemsctrl = function () { };


orgmemsctrl.prototype.create = function (req, res) {
    var urole = new OrgMems(req.body);
    urole.save(function (err, dta) {
        if (err) {
            console.log('error occured..' + err);
        }
        else {
            res.json(dta);
        }
    });
}

orgmemsctrl.prototype.list = function (req, res) {
    OrgMems.find(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

orgmemsctrl.prototype.getbyid = function (req, res) {
    OrgMems.find({ _id: req.params.id }).exec(function (err, gdt) {
        if (err) console.log('error occured..' + err);
        res.json(gdt);
    });
}

orgmemsctrl.prototype.getbyorg = function (req, res) {
    OrgMems.find({ organizer: req.params.id }).exec(function (err, gd) {
        if (err) console.log('error occured..' + err);
        res.json(gd);
    });
}

orgmemsctrl.prototype.update = function (req, res) {
    var updateObject = req.body;
    OrgMems.update({ _id: req.params.id }, { $set: updateObject }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

orgmemsctrl.prototype.delete = function (req, res) {
    OrgMems.findByIdAndRemove({ _id: req.params.id }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

orgmemsctrl.prototype.import = function (req, res) {
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
                        emailAddress: csvRow[0],
                        userType: csvRow[1],
                        organizer:req.body.organizer,
                        status:csvRow[2],
                    })
                })
                .on('done',()=>{
                    OrgMems.insertMany(data, (err, docs) => {
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

orgmemsctrl.prototype.csvDemo = function (req,  res){
    var fields = ['emailAddress', 'userType', 'status'];
    var myCars = [
    {
        "emailAddress": "test@test.com",
        "userType": "organizeradmin",
        "status": "approved"
    }, {
        "emailAddress": "test1@test.com",
        "userType": "organizeradmin",
        "status": "approved"
    }, {
        "emailAddress": "test2@test.com",
        "userType": "organizeradmin",
        "status": "approved"
    }
    ];
    var csv = json2csv({ data: myCars, fields: fields });
    fs.writeFile('uploads/csv/OrganizerMembers.csv', csv, function(err) {
        if (err) console.log(err);
        res.download(path.join(__dirname + '../../../uploads/csv/OrganizerMembers.csv'),"OrganizerMembers.csv");
    });
}
module.exports = new orgmemsctrl();
