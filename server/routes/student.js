let express = require('express')
let router = express.Router()
let auth = require('./auth')

// Require controller modules.
let studentController = require('../controllers/studentController') 

// 01 - creer un nouveau projet
router.post('/project/create', auth.optional, studentController.student_project_create_post)

// 02 - Mettre à jour un projet écrit par ce student. l'id du student sera récupéré du token
router.post('/project/update', auth.required, studentController.student_update_project)

// 03 - delete d'un projet écrit par ce student. l'id du student sera récupéré du token
router.post('/project/delete', auth.required, studentController.student_delete_project)

module.exports = router
