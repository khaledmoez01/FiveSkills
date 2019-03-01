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
router.get('/projects/image/:name', async (req, res) => {
  console.log(__dirname);
  res.sendFile('C:\\Users\\dell\\Desktop\\Projet Niveau3\\FiveSkills\\server\\uploads\\'+ req.params.name)
 });

// 01 - creer un nouveau projet
router.post('/project/create/:id_course/:id_user', auth.optional,upload.single('project_image'), studentController.student_project_create_post)

// 02 - Mettre à jour un projet écrit par ce student. l'id du student sera récupéré du token
router.post('/project/update/:id_project', auth.optional, studentController.student_update_project)

// 03 - delete d'un projet écrit par ce student. l'id du student sera récupéré du token
router.get('/project/delete/:id_project/:id_user', auth.optional, studentController.student_delete_project)
// 04 - voter un project
router.get('/project/vote/:id_user/:id_project', auth.optional, studentController.student_addVote)

// 05 - unvote
router.get('/project/unvote/:id_user/:id_project', auth.optional, studentController.student_unvote)
// 05 - course followers
router.get('/course/follow/:id_user/:id_course', auth.optional, studentController.student_followCourse)

// 05 - course unfollowers
router.get('/course/unfollow/:id_user', auth.optional, studentController.student_unfollowCourse)


// 06-students add courses to draft
router.post('/course/addtodraft/:id_user', auth.optional, studentController.student_add_Course_to_draft)

// 07-send to validated
router.post('/course/sendtovalidate/:id_user', auth.optional, studentController.student_send_Course_to_validate)

// 08 - recuperer la liste des projets
router.get('/projets', auth.optional, studentController.student_project_get)

// 09 - recuperer la liste des projets by id
router.get('/projets/:id_project', auth.optional, studentController.student_project_get_byid)
module.exports = router
