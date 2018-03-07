var express=require('express');
var player=require('../controllers/player');

module.exports=function(app){
    var playerRoute=express.Router();
        playerRoute.route('/')
                .get(player.list)
                .post(player.create);
        playerRoute.route('/:id')
                .get(player.getbyid)
                .put(player.update)
                .delete(player.delete);
            
    app.use('/api/player',playerRoute);
};
