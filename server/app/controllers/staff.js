var mongoose = require('mongoose');
var Staff = mongoose.model('staff');

var staffCtrl = function() {};

staffCtrl.prototype.create = function(req, res) {
    var staff = new Staff(req.body);
    staff.save(function (err, result) {
        if(err) return res.send(err);
        res.json(result)
    })
}

staffCtrl.prototype.list = function (req, res) {
    Staff.find({})
        .populate('members')
        .exec(function (err, result) {
            if (err) res.send(err);
            res.json(result);
        })
    
}

staffCtrl.prototype.getbyid = function (req, res) {
    Staff.findOne({_id:req.params.id})
        .populate('members')
        .exec(function (err, usrrs) {
        if (err) return res.send(err);
        res.json(usrrs); 
    });
}

staffCtrl.prototype.update = function (req, res) {
    Staff.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},function (err, dt) {
        if (err) return res.send(err);
        res.json(dt);            
    });
}

staffCtrl.prototype.delete = function (req, res) {
    Staff.findByIdAndRemove({_id:req.params.id},function (err, dt) {
        if (err) return res.send(err);
        res.json('Successfuly deleted');
    });
}


module.exports = new staffCtrl();
