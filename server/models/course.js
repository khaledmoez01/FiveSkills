let mongoose = require('mongoose')
let Schema = mongoose.Schema ;
var ObjectId = mongoose.Schema.Types.ObjectId;


let CourseSchema = new Schema({
    course_titre: {type:string} ,
    course_description: {type:string},
    course_enonce: {type:string},
    course_statut : {type:number},
    course_teacher : {type:ObjectId,ref:'User'},
    course_date : {type:Date,default:Date.now}

})

// Export model
module.exports = mongoose.model('Course', CourseSchema)
