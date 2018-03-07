var mongoose = require('mongoose');
var Player = mongoose.model('player');

var playerCtrl = function() {};

playerCtrl.prototype.create = function(req, res) {
    var player = new Player(req.body);
    player.save(function (err, result) {
        if(err) return res.send(err);
        res.json(result)
    })
}

playerCtrl.prototype.list = function (req, res) {
    Player.find({})
        .populate('members')
        .exec(function (err, result) {
            if (err) res.send(err);
            res.json(result);
        })
    
}

playerCtrl.prototype.getbyid = function (req, res) {
    Player.findOne({_id:req.params.id})
        .populate('members')
        .exec(function (err, usrrs) {
        if (err) return res.send(err);
        res.json(usrrs); 
    });
}

playerCtrl.prototype.update = function (req, res) {
    Player.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},function (err, dt) {
        if (err) return res.send(err);
        res.json(dt);            
    });
}

playerCtrl.prototype.delete = function (req, res) {
    Player.findByIdAndRemove({_id:req.params.id},function (err, dt) {
        if (err) return res.send(err);
        res.json('Successfuly deleted');
    });
}


module.exports = new playerCtrl();
