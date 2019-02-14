const Project = require('../models/project')
const Course = require('../models/course')
let Mongoose = require('mongoose')
let objectId=Mongoose.Types.ObjectId
// 01 - creer un nouveau projet
exports.student_project_create_post = [
  async(req, res, next) => {
    ProjectData={
    "project_title":req.body.project_title,
    "project_content":req.body.project_content,
    "project_image":req.file.filename,
    "project_course":req.params.id_course,
    "project_user":req.params.id_user
  }
    const result = await Project.create(ProjectData).catch(err => err)
    var id_project=result._id
    Course.update( { _id: objectId(req.params.id_course) },{ $push: {course_project:id_project } },(err,ress)=>{
        if(err){res.send(err)}
     res.send(ress)
    })
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

    result0 = await Project.findOne({ _id: projectID }).catch(err => err)
    console.log(result0);
    let courseID = result0.course_project;
    console.log(courseID);
    const result = await Project.deleteOne({ _id: projectID }).catch(err => err)
    console.log(result);
    
    resultF = await Course.updateOne({ _id: courseID }, { $pull: { course_project: projefixctID } }).catch(err => err);
    res.send("resultF","deleted");

   // res.send('NOT IMPLEMENTED: student_delete_project')
  }
]
