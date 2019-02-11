var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;



var CommentSchema = new Schema({

    comment_course:{type:ObjectId,ref:'Course'},
    comment_date: {type:Date,default:Date.now},
    comment_user:[ {type:ObjectId,ref:'User'}] ,
    comment_content:  {type:String}


});
module.exports = mongoose.model('Comment', CommentSchema);;