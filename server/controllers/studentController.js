//let Project = require('../models/Project')
// 01 - creer un nouveau projet
exports.student_project_create_post = [
  (req, res, next) => {
    console.log(req.body)

  }
]

// 02 - Mettre à jour un projet écrit par ce student. l'id du student sera récupéré du token
exports.student_update_project = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: student_update_project')
  }
]

// 03 - delete d'un projet écrit par ce student. l'id du student sera récupéré du token
exports.student_delete_project = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: student_delete_project')
  }
]
