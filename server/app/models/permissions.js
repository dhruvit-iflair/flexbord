/*
Created By : Hardik Lakhani(hardik.lakhani@iflair.com)
*/
var mongoose=require('mongoose');
Schema=mongoose.Schema;
var permSchema=new Schema({
    roles:{ type: Schema.Types.ObjectId, ref: 'roles' },
    permissions:Schema.Types.Mixed
});
module.exports = mongoose.model('permissions',permSchema);
