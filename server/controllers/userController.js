
let Course = require('../models/course')
let Project = require('../models/project')
var User = require('../models/user')
var Comment = require('../models/comment');

const ObjectId = require('mongodb').ObjectId;

// 01 - recuperer la liste des courses
exports.user_courses_get = [
  async (req, res, next) => {


    const result = await Course.find().exec().catch(err => err)
    res.send(result)
  }
]

// 02 - creer un course draft
exports.user_course_create_draft = [
  async (req, res, next) => {

    console.log(req.body)
    let teacherID = req.params.id_teacher
    let courseDATA = {
      course_title: req.body.course_title,
      course_teacher: teacherID,
      course_content: req.body.course_content,
      course_description: req.body.course_description,
      course_statement: req.body.course_statement,
      // course_status: req.body.course_status
    }
    const result = await Course.create(courseDATA).catch(err => err)
    res.send(result)
    const add = await User.findByIdAndUpdate(teacherID, { $push: { user_courses: result } }).catch(err => err)
    console.log(add)
  }
]

// 03 - creer un course published
exports.user_course_create_published = [
  async (req, res, next) => {

    console.log(req.body)
    let teacherID = req.params.id_teacher
    let courseDATA = {
      course_title: req.body.course_title,
      course_teacher: teacherID,
      course_content: req.body.course_content,
      course_description: req.body.course_description,
      course_image: req.file.filename,
      course_statement: req.body.course_statement,
      course_status: 3,
    }
    const result = await Course.create(courseDATA).catch(err => err)
    res.send(result)
    const add = await User.findByIdAndUpdate(teacherID, { $push: { user_courses: result } }).catch(err => err)
    console.log(add)
  }
]
// 04 - Récupérer les détails d’un course. cela inclut la récupération des projets de ce course et ses commentaires
exports.user_course_get = [
  async (req, res, next) => {
    let courseID = { _id: ObjectId(req.params.id_course) };
    const result = await Course.findOne(courseID).populate([{ path: 'course_project', populate: { path: 'project_user', select: ['user_last_name', 'user_first_name'] } }, { path: 'course_comment', select: ['comment_content', 'comment_date'],populate: { path: 'comment_user', select: ['user_last_name', 'user_first_name','user_image'] } }, { path: 'course_teacher', select: ['user_first_name', 'user_last_name'] }]).exec().catch(err => err)
    res.send(result)
  }
]

// 05 - Mettre à jour un course  (id_course présent dans body) ecrit par ce user. l'id du user sera récupéré du token
exports.user_course_update_post = [
  async (req, res, next) => {
    let id = { _id: ObjectId(req.params.id_course) }
    const result = await Course.findByIdAndUpdate(id, { $set: req.body }).exec().catch(err => err)
    res.send({ msg: "changed", result })
    // res.send('NOT IMPLEMENTED: user_course_update_post')
  }
]

// 06 - Suppression d'un course ecrit par ce user  (id_course présent dans body). l'id du user sera récupéré du token
exports.user_course_delete_post = [
  async (req, res, next) => {
    let id = { _id: ObjectId(req.params.id_courses) }
    Course.findByIdAndRemove(id).catch(err => err)
    res.send("deleted")
    // res.send('NOT IMPLEMENTED: user_course_delete_post')
  }
]

// 07 - follow a course (id_course présent dans body). Le votant sera ce même user. l'id du user sera récupéré du token
exports.user_course_follow_post = [
  (req, res, next) => {
    Course.updateOne({ _id: ObjectId(req.params.id_course) }, { $addToSet: { course_followers: { user_id: req.params.id_user } } }
    ).catch(err => err);
    console.log(res)
    res.send("added")
  }
  // res.send('NOT IMPLEMENTED: user_course_follow_post')
]

// 08 - Récupérer les détails d’un user. l'id du user sera récupéré du token. On recupere aussi la liste des commentaires ecrits par ce user
exports.user_get = [
  async (req, res, next) => {
    let id = { _id: ObjectId(req.params.id_user) }
    const result = await User.findOne(id).catch(err => err)
    res.send(result)
    // res.send('NOT IMPLEMENTED: user_get')
  }
]

// 09 - Mettre à jour de ce même user. l'id du user sera récupéré du token
exports.user_update_post = [
  async (req, res, next) => {
    let id = { _id: ObjectId(req.params.id_user) }
    req.body.password = bcrypt.hashSync(this.password);
    const result = await User.findOneAndUpdate(id, req.body).catch(err => err)
    res.send(result);
    // res.send('NOT IMPLEMENTED: user_update_post')
  }
]

// 10 - Suppression de ce même user. l'id du user sera récupéré du token
exports.user_delete_post = [
  async (req, res, next) => {
    let id = { _id: ObjectId(req.params.id_user) }
    const result = await User.findByIdAndRemove(id).catch(err => err)
    res.send(result);
    // res.send('NOT IMPLEMENTED: user_delete_post')
  }
]

// 11 - Créer un commentaire sur un course (id_article présent dans body). Le commentateur sera ce même user. l'id du user sera récupéré du token
exports.user_comment_create_post = [
  async (req, res, next) => {
    let course_id = req.params.id_Course
    let user_ID = req.params.id_user
    console.log("result")
    let commentDATA = {
      comment_content: req.body.comment_content,
      comment_user: user_ID,
      comment_course: course_id
    }
    const result = await Comment.create(commentDATA).catch(err => err)
    const Cours = await Course.findByIdAndUpdate(course_id, { $push: { course_comment: result } }).catch(err => err)
    const comment = await User.findByIdAndUpdate(user_ID, { $push: { user_comments: result } }).catch(err => err)
    res.send(result);
    console.log(Cours, comment)
    // res.send('NOT IMPLEMENTED: user_comment_create_post')
  }
]

// 12 - Mettre à jour un comment ecrit par ce user (id_user récupéré depuis le token). id_comment present dans body.
exports.user_comment_update_post = [
  async (req, res, next) => {
    let id = { _id: ObjectId(req.params.id_comment) }
    const result = await Comment.findByIdAndUpdate(id, req.body).catch(err => err)
    res.send(result);

    // res.send('NOT IMPLEMENTED: user_comment_update_post')
  }
]

// 13 - Suppression d'un comment ecrit par ce user (id_user récupéré depuis le token). id_comment present dans body
exports.user_comment_delete_post = [
  async (req, res, next) => {
    let ID = ObjectId(req.params.id_Course);
  let result = await Course.updateOne({ _id: ID }, { $pull: { course_comment:ObjectId(req.params.id_comment) } }).exec().catch(err => err);
       let resultCU = await User.updateMany( {}, { $pull: { user_comments:ObjectId(req.params.id_comment) } }).exec().catch(err => err);
    let resultCC = await Comment.findByIdAndRemove(req.params.id_comment)
       console.log({result,resultCU,resultCC});
    res.send(result)

    // res.send('NOT IMPLEMENTED: user_comment_delete_post')
  }
]

// 14 - voter un projet (id_projet présent dans body). Le votant sera ce même user. l'id du user sera récupéré du token
exports.user_project_vote_post = [
  (req, res, next) => {
    (req, res, next) => {
      Project.updateOne({ _id: objectId(req.params.id_project) }, { $addToSet: { project_vote: req.params.id_user } }, (err, ress) => {
        if (err) { res.send(err) }
        res.send(ress)
      })
    }
    // res.send('NOT IMPLEMENTED: user_project_vote_post')
  }
]

// 15 - Récupérer les détails d’un project.
exports.user_project_get = [
  async (req, res, next) => {

    let ProjectID = req.params.id_project;
    const result = await Project.findOne({ _id: ProjectID }).populate({ path: 'project_course' }).exec().catch(err => err)
    res.send(result)
  }
]
