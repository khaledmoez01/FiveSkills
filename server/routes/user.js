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
let userController = require('../controllers/userController')

router.get('/courses/image/:name', async (req, res) => {
  console.log(__dirname);
  res.sendFile('C:\\Users\\dell\\Desktop\\Projet Niveau3\\FiveSkills\\server\\uploads\\'+ req.params.name)
 });

// 01 - recuperer la liste des courses(id teacher)
router.get('/courses', auth.optional, userController.user_courses_get)

// 01 - recuperer la liste des Users
router.get('/users', auth.optional, userController.user_get_users)

// 02 - creer un course

router.post('/course/createdraft/:id_teacher', auth.optional , upload.single('course_image'), userController.user_course_create_draft)


// 03 - creer un course published
router.post('/course/createpublished/:id_teacher', auth.optional, upload.single('course_image'), userController.user_course_create_published)

// 04 - Récupérer les détails d’un course. cela inclut la récupération des projets de ce course et ses commentaires
router.get('/course/:id_course', auth.optional, userController.user_course_get)

// 05 - Mettre à jour un course  (id_course présent dans body) ecrit par ce user. l'id du user sera récupéré du token
router.post('/course/update/:id_course', auth.optional,upload.single('course_image'), userController.user_course_update_post)

// 06 - Suppression d'un course ecrit par ce user  (id_course présent dans body). l'id du user sera récupéré du token
router.get('/course/delete/:id_course/:id_user/:index', auth.optional, userController.user_course_delete_post)

// 06 - follow a course (id_course présent dans body). Le votant sera ce même user. l'id du user sera récupéré du token
router.post('/course/follow/:id_user/:id_course', auth.optional, userController.user_course_follow_post)

// 08 - Récupérer les détails d’un user. l'id du user sera récupéré du token. On recupere aussi la liste des commentaires ecrits par ce user
router.get('/user/:id_user', auth.optional, userController.user_get)


// 09 - Mettre à jour de ce même user. l'id du user sera récupéré du token
router.post('/user/update/:id_user', auth.optional, upload.single('user_image'), userController.user_update_post)

// 10 - Suppression de ce même user. l'id du user sera récupéré du token
router.post('/user/delete/:id_user', auth.optional, userController.user_delete_post)

// 11 - Créer un commentaire sur un course (id_article présent dans body). Le commentateur sera ce même user. l'id du user sera récupéré du token
router.post('/comment/create/:id_Course/:id_user', auth.optional, userController.user_comment_create_post)

// 12 - Mettre à jour un comment ecrit par ce user (id_user récupéré depuis le token). id_comment present dans body.
router.post('/comment/update/:id_comment', auth.optional, userController.user_comment_update_post)


// 12 - teacher sends courses form draft to published
router.get('/course/teachersendscoursefromdrafttopublished/:id_course', auth.optional, userController.user_CourseFormDraftToPublished)

// 13 - Suppression d'un comment ecrit par ce user (id_user récupéré depuis le token). id_comment present dans body
router.get('/comment/delete/:id_Course/:id_comment', auth.optional, userController.user_comment_delete_post)

// 13 - voter un projet (id_projet présent dans body). Le votant sera ce même user. l'id du user sera récupéré du token
router.post('/project/vote/:id_user/:id_project', auth.required, userController.user_project_vote_post)

// 15 - Récupérer les détails d’un project.
router.get('/project/:id_project', auth.optional, userController.user_project_get)

// 16 - modifier les détails d’un project.
router.post('/project/:id_project', auth.optional,upload.single('project_image'), userController.user_project_edit)

// 15 - delete un project.
router.get('/project/:id_project/:id_user/:index', auth.optional, userController.user_delete_project)

module.exports = router
