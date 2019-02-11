// 01 - recuperer la liste des courses
exports.user_courses_get = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: user_courses_get')
  }
]

// 02 - creer un course
exports.user_course_create_post = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: user_course_create_post')
  }
]

// 03 - Récupérer les détails d’un course. cela inclut la récupération des projets de ce course et ses commentaires
exports.user_course_get = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: user_course_get')
  }
]

// 04 - Mettre à jour un course  (id_course présent dans body) ecrit par ce user. l'id du user sera récupéré du token
exports.user_course_update_post = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: user_course_update_post')
  }
]

// 05 - Suppression d'un course ecrit par ce user  (id_course présent dans body). l'id du user sera récupéré du token
exports.user_course_delete_post = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: user_course_delete_post')
  }
]

// 06 - follow a course (id_course présent dans body). Le votant sera ce même user. l'id du user sera récupéré du token
exports.user_course_follow_post = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: user_course_follow_post')
  }
]

// 07 - Récupérer les détails d’un user. l'id du user sera récupéré du token. On recupere aussi la liste des commentaires ecrits par ce user
exports.user_get = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: user_get')
  }
]

// 08 - Mettre à jour de ce même user. l'id du user sera récupéré du token
exports.user_update_post = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: user_update_post')
  }
]

// 09 - Suppression de ce même user. l'id du user sera récupéré du token
exports.user_delete_post = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: user_delete_post')
  }
]

// 10 - Créer un commentaire sur un course (id_article présent dans body). Le commentateur sera ce même user. l'id du user sera récupéré du token
exports.user_comment_create_post = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: user_comment_create_post')
  }
]

// 11 - Mettre à jour un comment ecrit par ce user (id_user récupéré depuis le token). id_comment present dans body.
exports.user_comment_update_post = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: user_comment_update_post')
  }
]

// 12 - Suppression d'un comment ecrit par ce user (id_user récupéré depuis le token). id_comment present dans body
exports.user_comment_delete_post = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: user_comment_delete_post')
  }
]

// 13 - voter un projet (id_projet présent dans body). Le votant sera ce même user. l'id du user sera récupéré du token
exports.user_project_vote_post = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: user_project_vote_post')
  }
]

// 14 - Récupérer les détails d’un project.
exports.user_project_get = [
  (req, res, next) => {
    res.send('NOT IMPLEMENTED: user_project_get')
  }
]
