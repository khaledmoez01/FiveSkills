const Project = require('../models/project')
// 01 - creer un nouveau projet
exports.student_project_create_post = [
  async(req, res, next) => {
    ProjectData={"project_title":req.body.project_title,"project_content":req.body.project_content,"project_image":req.file.filename,"project_course":req.params.id_course,"project_user":req.params.id_user}
    const result = await Project.create(ProjectData).catch(err => err)
    res.send(result)
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
