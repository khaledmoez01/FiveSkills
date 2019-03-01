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
let indexController = require('../controllers/indexController')

// body(firstName, lastName, email, password, role) - Création d’un user
router.post('/signup', upload.single('user_image'),indexController.index_signup_post)


// body(email, password) - Authentification d’un user
router.post('/login', auth.optional, indexController.index_login_post)

router.get('/image/:name', upload.single('user_image'),async (req, res) => {
  console.log(__dirname)
  res.sendFile('C:\\Users\\emna\\Desktop\\projet Niveau 3\\FiveSkills\\server\\uploads\\' + req.params.name)
})
module.exports = router
