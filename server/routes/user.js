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

// 02 - creer un course
router.post('/course/createdraft/:id_teacher', auth.optional , upload.single('course_image'), userController.user_course_create_draft)

// 03 - creer un course published
router.post('/course/createpublished/:id_teacher', auth.optional, userController.user_course_create_published)

// 04 - Récupérer les détails d’un course. cela inclut la récupération des projets de ce course et ses commentaires
router.get('/course/:id_course', auth.optional, userController.user_course_get)

// 05 - Mettre à jour un course  (id_course présent dans body) ecrit par ce user. l'id du user sera récupéré du token
router.post('/course/update/:id_course', auth.optional, userController.user_course_update_post)

// 06 - Suppression d'un course ecrit par ce user  (id_course présent dans body). l'id du user sera récupéré du token
router.post('/course/delete/:id_course', auth.optional, userController.user_course_delete_post)

// 06 - follow a course (id_course présent dans body). Le votant sera ce même user. l'id du user sera récupéré du token
router.post('/course/follow/:id_user/:id_course', auth.required, userController.user_course_follow_post)

// 08 - Récupérer les détails d’un user. l'id du user sera récupéré du token. On recupere aussi la liste des commentaires ecrits par ce user
router.get('/user/:id_user', auth.optional, userController.user_get)

// 09 - Mettre à jour de ce même user. l'id du user sera récupéré du token
router.post('/user/update/:id_user', auth.optional, userController.user_update_post)

// 10 - Suppression de ce même user. l'id du user sera récupéré du token
router.post('/user/delete/:id_user', auth.optional, userController.user_delete_post)

// 11 - Créer un commentaire sur un course (id_article présent dans body). Le commentateur sera ce même user. l'id du user sera récupéré du token
router.post('/comment/create/:id_Course/:id_user', auth.optional, userController.user_comment_create_post)

// 12 - Mettre à jour un comment ecrit par ce user (id_user récupéré depuis le token). id_comment present dans body.
router.post('/comment/update/:id', auth.optional, userController.user_comment_update_post)

// 13 - Suppression d'un comment ecrit par ce user (id_user récupéré depuis le token). id_comment present dans body
router.post('/comment/delete/:id_Course/:index_comment', auth.optional, userController.user_comment_delete_post)

// 13 - voter un projet (id_projet présent dans body). Le votant sera ce même user. l'id du user sera récupéré du token
router.post('/project/vote/:id_user/:id_project', auth.required, userController.user_project_vote_post)

// 15 - Récupérer les détails d’un project.
router.get('/project/:id_project', auth.required, userController.user_project_get)

module.exports = router
