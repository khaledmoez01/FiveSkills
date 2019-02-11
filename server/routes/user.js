let express = require('express')
let router = express.Router()
let auth = require('./auth')

// Require controller modules.
let userController = require('../controllers/userController')

// 01 - recuperer la liste des courses
router.get('/courses', auth.required, userController.user_courses_get)

// 02 - creer un course
router.post('/course/create', auth.required, userController.user_course_create_post)

// 03 - Récupérer les détails d’un course. cela inclut la récupération des projets de ce course et ses commentaires
router.get('/course/:id_course', auth.required, userController.user_course_get)

// 04 - Mettre à jour un course  (id_course présent dans body) ecrit par ce user. l'id du user sera récupéré du token
router.post('/course/update', auth.required, userController.user_course_update_post)

// 05 - Suppression d'un course ecrit par ce user  (id_course présent dans body). l'id du user sera récupéré du token
router.post('/course/delete', auth.required, userController.user_course_delete_post)

// 06 - follow a course (id_course présent dans body). Le votant sera ce même user. l'id du user sera récupéré du token
router.post('/course/follow', auth.required, userController.user_course_follow_post)

// 07 - Récupérer les détails d’un user. l'id du user sera récupéré du token. On recupere aussi la liste des commentaires ecrits par ce user
router.get('/user', auth.required, userController.user_get)

// 08 - Mettre à jour de ce même user. l'id du user sera récupéré du token
router.post('/user/update', auth.required, userController.user_update_post)

// 09 - Suppression de ce même user. l'id du user sera récupéré du token
router.post('/user/delete', auth.required, userController.user_delete_post)

// 10 - Créer un commentaire sur un course (id_article présent dans body). Le commentateur sera ce même user. l'id du user sera récupéré du token
router.post('/comment/create', auth.required, userController.user_comment_create_post)

// 11 - Mettre à jour un comment ecrit par ce user (id_user récupéré depuis le token). id_comment present dans body.
router.post('/comment/update', auth.required, userController.user_comment_update_post)

// 12 - Suppression d'un comment ecrit par ce user (id_user récupéré depuis le token). id_comment present dans body
router.post('/comment/delete', auth.required, userController.user_comment_delete_post)

// 13 - voter un projet (id_projet présent dans body). Le votant sera ce même user. l'id du user sera récupéré du token
router.post('/project/vote', auth.required, userController.user_project_vote_post)

// 14 - Récupérer les détails d’un project.
router.get('/project/:id_project', auth.required, userController.user_project_get)

module.exports = router
