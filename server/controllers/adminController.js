var User = require('../models/user');
var Course = require('../models/course');
var Project = require('../models/project');
var Comment = require('../models/comment');
const ObjectId = require('mongodb').ObjectId;

// 01 - Récupérer le nombre des cours , des projets , des commentaires et des utilisateurs
exports.admin_count_get = [
  async (req, res, next) => {
    const nbrCourse = await Course.count().exec().catch(err => err)
    const nbrProject = await Project.count().exec().catch(err => err)
    const nbrComment = await Comment.count().exec().catch(err => err)
    return res.json({"nbrCourse": nbrCourse, "nbrProject": nbrProject, "nbrComment": nbrComment})
    //res.send('NOT IMPLEMENTED: admin_count_get')
  }
]

// 02 - Récupérer la liste des courses
exports.admin_courses_get = [
  async (req, res, next) => {
    const result = await Course.find({}).exec().catch(err => err)
    res.send(result)
    //res.send('NOT IMPLEMENTED: admin_courses_get')
  }
]

// 03 - Récupérer les détails d’un course
exports.admin_course_get = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: admin_course_get')
  }
]

// 04 - Mettre à jour un course
exports.admin_course_update_post = [
  async (req, res, next) => {
    let id = { _id: ObjectId(req.params.id_courses) }
    const result = await Course.findByIdAndUpdate(id, { $set: req.body }).exec().catch(err => err)
    res.send({ msg: "changed", result })
    //res.send('NOT IMPLEMENTED: admin_course_update_post')
  }
]

// 05 - Suppression d'un course
exports.admin_course_delete_post = [
  (req, res, next) => {
    let id = { _id: ObjectId(req.params.id_courses) }
    Course.findByIdAndRemove(id).catch(err => err)
    res.send("deleted")
    //res.send('NOT IMPLEMENTED: admin_course_delete_post')
  }
]

// 06 - Récupérer la liste des projects
exports.admin_projects_get = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: admin_projects_get')
  }
]

// 07 - Récupérer les détails d’un project
exports.admin_project_get = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: admin_project_get')
  }
]

// 08 - Mettre à jour d'un project
exports.admin_project_update_post = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: admin_project_update_post')
  }
]

// 09 - Suppression d'un project
exports.admin_project_delete_post = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: admin_project_delete_post')
  }
]

// 10 - Récupérer la liste des comments
exports.admin_comments_get = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: admin_comments_get')
  }
]

// 11 - Récupérer les détails d’un comment
exports.admin_comment_get = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: admin_comment_get')
  }
]

// 12 - Mettre à jour un comment
exports.admin_comment_update_post = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: admin_comment_update_post')
  }
]

// 13 - Suppression d'un comment
exports.admin_comment_delete_post = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: admin_comment_delete_post')
  }
]

// 14 - Récupérer la liste des users
exports.admin_users_get = [
 async (req, res, next) => {
    console.log('yyy')
    const result = await User.find().exec().catch(err => err);
     res.send(result)
    //res.send('NOT IMPLEMENTED: admin_users_get')
  }
]

// 15 - Récupérer les détails d’un user
exports.admin_user_get = [
  async (req, res, next) => {
    let id = { _id: ObjectId(req.params.id_user) }
    const result = await User.findOne(id).catch(err => err)
    res.send(result)
    //res.send('NOT IMPLEMENTED: admin_user_get')
  }
]

// 16 - Mettre à jour un user
exports.admin_user_update_post = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: admin_user_update_post')
  }
]

// 17 - Suppression d'un user
exports.admin_user_delete = [
  (req, res, next) => {
    let id = { _id: ObjectId(req.params.id) }
    User.findByIdAndRemove(id).catch(err => err)
    res.send("deleted")
    //res.send('NOT IMPLEMENTED: admin_user_delete_post')
  }
]
