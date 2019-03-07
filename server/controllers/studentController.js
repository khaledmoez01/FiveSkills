const Project = require('../models/project')
const Course = require('../models/course')
const User = require('../models/user')
let Mongoose = require('mongoose')
let ObjectId = Mongoose.Types.ObjectId
// 01 - creer un nouveau projet
exports.student_project_create_post = [
  async (req, res, next) => {
    let id = { _id: ObjectId(req.params.id_course) }
    let ID = { _id: ObjectId(req.params.id_user) }
    ProjectData = {
      project_title: req.body.project_title,
      project_content: req.body.project_content,
      project_image: req.file.filename,
      project_course: req.params.id_course,
      project_user: req.params.id_user
    }
    const result = await Project.create(ProjectData).catch(err => err)
    res.send(result)
    const userproject = await User.findByIdAndUpdate(ID, { $push: { user_project: result } }).catch(err => err)
    const courseproject = await Course.findByIdAndUpdate(id, { $push: { course_project: result } }).catch(err => err)
    // console.log(userproject,courseproject)
  }

]

// 02 - Mettre à jour un projet écrit par ce student. l'id du student sera récupéré du token
exports.student_update_project = [
  async (req, res, next) => {
    let id = { _id: ObjectId(req.params.id_project) }
    const result = await Project.findByIdAndUpdate(id, { $set: req.body }).exec().catch(err => err)
    res.send({ msg: "changed", result })
    //res.send('NOT IMPLEMENTED: student_update_project')
  }
]

// 03 - delete d'un projet écrit par ce student. l'id du student sera récupéré du token
exports.student_delete_project = [
  async (req, res, next) => {
    let id_course = { _id: ObjectId(req.params.id_course) }
    let id_user = { _id: ObjectId(req.params.id_user) }
    let result = await Project.findByIdAndRemove(req.params.id_project).exec().catch(err => err)
    let resultF = await Course.updateOne(id_course, { $pull: { course_project: ObjectId(req.params.id_project) } }).exec().catch(err => err)
    let resultD = await User.updateOne(id_user, { $pull: { user_project: ObjectId(req.params.id_project) } }).exec().catch(err => err)
    res.send({ msg: 'deleted', result, resultF, resultD });

    // res.send('NOT IMPLEMENTED: student_delete_project')
  }
]
// 04 - add vote to project
exports.student_addVote = [
  async (req, res, next) => {
    const result = await Project.updateOne({ _id: ObjectId(req.params.id_project) }, { $addToSet: { project_vote: req.params.id_user } }).exec().catch(err => err)
    res.send(result)
  }
]
// 04 - add vote to project
exports.student_unvote = [
  async (req, res, next) => {
    id_project = { _id: ObjectId(req.params.id_project) }
    let deleteVoteProject = await Project.findByIdAndUpdate(id_project, { $pull: { project_vote: ObjectId(req.params.id_user) } }).exec().catch(err => err)
    res.send({ msg: 'vote deleted', deleteVoteProject })
  }
]
// 05 - follow course  

exports.student_followCourse = [
  async (req, res, next) => {
    const id = { _id: ObjectId(req.params.id_course) }
    const result = await Course.updateOne(id, { $addToSet: { course_followers: { user_id: req.params.id_user } } }).exec().catch(err => err)
    const getresult = await Course.findOne(id).exec().catch(err => err)
    console.log(getresult);
    res.send(getresult.course_followers)

    //course.subSchemaFollowers.create(req.params.id_user)


  }
]
exports.student_unfollowCourse = [
  async (req, res, next) => {
    const id = { _id: ObjectId(req.params.id_course) }
    let deleteFollowCourse = await Course.findByIdAndUpdate(id, { $pull: { course_followers: { user_id: ObjectId(req.params.id_user) } } }).exec().catch(err => err)
    res.send({ msg: 'unfollowed', deleteFollowCourse })
  }
]
// 06 - students add courses to draft
exports.student_add_Course_to_draft = [
  async (req, res, next) => {
    console.log(req.body)
    let StudentID = req.params.id_user
    let courseDATA = {
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
    const add = await User.findByIdAndUpdate(StudentID, { $push: { user_courses: result } }).catch(err => err)
    console.log(add)
  }

  // res.send('NOT IMPLEMENTED: student_add_Course_to_draft')

]
// 07-send to validated
exports.student_send_Course_to_validate = [
  async (req, res, next) => {

    console.log(req.body)
    let StudentID = req.params.id_user
    let courseDATA = {
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
    const add = await User.findByIdAndUpdate(StudentID, { $push: { user_courses: result } }).catch(err => err)
    console.log(add)
  }
]

// res.send('NOT IMPLEMENTED: student_send_Course_to_validate')

// 08-recuperer la liste des projets
exports.student_project_get = [
  async (req, res, next) => {

    const result = await Project.find().catch(err => err)
    res.send(result)
  }


]
// 09-recuperer la liste des projets by id
exports.student_project_get_byid = [
  async (req, res, next) => {
    let id = { _id: ObjectId(req.params.id_project) }
    const result = await Project.findOne(id).populate({path : 'project_user', select :['user_first_name','user_last_name','user_role']}).exec().catch(err => err)
    res.send(result)
  }


]

// student cans send courses from draft to pending 
exports.student_courseFromDraftToPending =[
  (req, res , next)=>{
       let id = { _id: ObjectId(req.params.id_course) }
   Course.findByIdAndUpdate(id ,{$set: {course_status : 2}}).catch(err => err)
    res.send("works")
  }
]



