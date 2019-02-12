let Course = require('../models/course')
let User = require('../models/user')
let Comment = require('../models/comment')
let Project = require('../models/project')

let async = require('async')
let userRoleEnum = require('../config/userRoles').userRoleEnum

// 01 - Récupérer le nombre de projets, d'utilisateurs, de commentaires et de cours.
exports.admin_count_get = [
  (req, res, next) => {
    console.log(req.payload)
    if (req.payload.role === userRoleEnum.get('admin').value) {
      async.parallel(
        {
          course_count: function (callback) {
            Course.countDocuments({}, callback)
          },
          user_count: function (callback) {
            User.countDocuments({}, callback)
          },
          comment_count: function (callback) {
            Comment.countDocuments({}, callback)
          },
          project_count: function (callback) {
            Project.countDocuments({}, callback)
          }
        },
        function (err, results) {
          if (err) {
            return res.status(500).send({ code: '500', message: 'There was a problem counting the documents in the database: ' + err.message })
          }
          res.status(200).send(results)
        }
      )
    } else {
      return res.status(403).send({ code: 403, message: 'access denied' })
    }
  }
]

// 02 - Récupérer la liste des courses
exports.admin_courses_get = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: admin_courses_get')
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
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: admin_course_update_post')
  }
]

// 05 - Suppression d'un course
exports.admin_course_delete_post = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: admin_course_delete_post')
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
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: admin_users_get')
  }
]

// 15 - Récupérer les détails d’un user
exports.admin_user_get = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: admin_user_get')
  }
]

// 16 - Mettre à jour un user
exports.admin_user_update_post = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: admin_user_update_post')
  }
]

// 17 - Suppression d'un user
exports.admin_user_delete_post = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: admin_user_delete_post')
  }
]
