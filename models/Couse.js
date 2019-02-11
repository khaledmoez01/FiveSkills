var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;



var CourseSchema = new Schema({

    course_titre: {type:String},
    course_description:  {type:String},
    course_content: {type:String},
    course_states:  {type:String},
    course_statut: enum_statut,
    course_teacher:{type:ObjectId,ref:'User'},
    course_date: {type:Date,default:Date.now},
    course_studentFllowers:[{type:ObjectId,ref:'User'}]

});
module.exports = mongoose.model('Course', CourseSchema);;