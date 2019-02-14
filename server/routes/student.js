let express = require('express')
let router = express.Router()
let auth = require('./auth')
const path = require("path");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'server/uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});
var upload = multer({ storage: storage });
// Require controller modules.
let studentController = require('../controllers/studentController') 

// 01 - creer un nouveau projet
router.post('/project/create/:id_course/:id_user', auth.optional,upload.single('project_image'), studentController.student_project_create_post)

// 02 - Mettre à jour un projet écrit par ce student. l'id du student sera récupéré du token
router.post('/project/update/:id_project', auth.required, studentController.student_update_project)

// 03 - delete d'un projet écrit par ce student. l'id du student sera récupéré du token
router.post('/project/delete/:id_project', auth.required, studentController.student_delete_project)

module.exports = router
