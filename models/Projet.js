var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;



var projetSchema = new Schema({

    projet_titre: {type:String},
    projet_vote:  {type:Number} , 
    projet_content:{type:String},
    projet_date:  {type:Date,default:Date.now},
    projet_course :{type:ObjectId,ref:'Course'},
    projet_student :{type:ObjectId,ref:'User'}


});
module.exports = mongoose.model('Project', projetSchema);