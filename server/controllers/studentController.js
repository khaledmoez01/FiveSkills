const Project = require('../models/project')
const Course = require('../models/course')
const User = require('../models/user')
let Mongoose = require('mongoose')
let ObjectId=Mongoose.Types.ObjectId
// 01 - creer un nouveau projet
exports.student_project_create_post = [
  async(req, res, next) => {
    let id = { _id: ObjectId(req.params.id_course) }
    let ID = { _id: ObjectId(req.params.id_user) }
    ProjectData={
    project_title:req.body.project_title,
    project_content:req.body.project_content,
    project_image:req.file.filename,
    project_course:req.params.id_course,
    project_user:req.params.id_user
  }
    const result = await Project.create(ProjectData).catch(err => err)
    res.send(result)
     const userproject = await User.findByIdAndUpdate(ID, { $push: { user_project: result } }).catch(err => err)
     const courseproject = await Course.findByIdAndUpdate( id,{ $push: {course_project:result } }).catch(err => err)
    // console.log(userproject,courseproject)
  }

]

// 02 - Mettre à jour un projet écrit par ce student. l'id du student sera récupéré du token
exports.student_update_project = [
 async(req, res, next) => {
  let id = { _id: ObjectId(req.params.id_project) }
  const result = await Project.findByIdAndUpdate(id, { $set: req.body }).exec().catch(err => err)
  res.send({ msg: "changed", result })
    //res.send('NOT IMPLEMENTED: student_update_project')
  }
]

// 03 - delete d'un projet écrit par ce student. l'id du student sera récupéré du token
exports.student_delete_project = [
  async(req, res, next) => {

    let projectID = ObjectId(req.params.id_project)
    let UserID = ObjectId(req.params.id_user)

    result0 = await Project.findOne({ _id: projectID }).catch(err => err)
    console.log(result0);
    let courseID = result0.project_course;
    console.log(courseID);
    const result = await Project.deleteOne({ _id: projectID }).catch(err => err)
    console.log(result);
    
    resultF = await Course.updateOne({ _id: courseID }, { $pull: { "course_project": projectID } }).catch(err => err);
    resultD = await Course.updateOne({ _id: UserID }, { $pull: { "user_project": UserID } }).catch(err => err);
    res.send("deleted");

   // res.send('NOT IMPLEMENTED: student_delete_project')
  }
]
// 04 - add vote to project
exports.student_addVote = [
  (req, res, next) => {
    Project.updateOne( { _id: objectId(req.params.id_project) },{ $addToSet: {project_vote :req.params.id_user } },(err,ress)=>{
      if(err){res.send(err)}
   res.send(ress)
  })

      }
]
// 05 - follow course  
 
exports.student_followCourse = [
  async(req, res, next) => {
    Course.updateOne( { _id: objectId(req.params.id_course) },{ $addToSet: {course_followers : {user_id:req.params.id_user} } },(err,ress)=>{
      if(err){res.send(err)}
   res.send(ress)
  })
  //course.subSchemaFollowers.create(req.params.id_user)
  

      }
]
// 06 - students add courses to draft
exports.student_add_Course_to_draft = [
  async(req, res, next) => {
    console.log(req.body)
    let StudentID=req.params.id_user
    let courseDATA={
      course_title: req.body.course_title,
      course_teacher: StudentID,
      course_content: req.body.course_content,
      course_description: req.body.course_description,
      course_statement: req.body.course_statement,
      course_image: req.file.filename
     // course_status: req.body.course_status
  }
  const result = await Course.create(courseDATA).catch(err => err)
    res.send(result)
    const add = await User.findByIdAndUpdate(StudentID,{ $push:{ user_courses:result }}).catch(err => err)
    console.log(add)
  } 
    
    // res.send('NOT IMPLEMENTED: student_add_Course_to_draft')
    
]
// 07-send to validated
exports.student_send_Course_to_validate = [
  async(req, res, next) => {
    
    console.log(req.body)
    let StudentID=req.params.id_user
    let courseDATA={
      course_title: req.body.course_title,
      course_teacher: StudentID,
      course_content: req.body.course_content,
      course_description: req.body.course_description,
      course_statement: req.body.course_statement,
      course_image: req.file.filename,
    course_status: 2,
  }
  const result = await Course.create(courseDATA).catch(err => err)
    res.send(result)
    const add = await User.findByIdAndUpdate(StudentID,{ $push:{ user_courses:result }}).catch(err => err)
    console.log(add)
  } 
    // res.send('NOT IMPLEMENTED: student_send_Course_to_validate')
     
]