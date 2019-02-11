let express = require('express')
let router = express.Router()
let auth = require('./auth')

// Require controller modules.
let indexController = require('../controllers/indexController')

// body(firstName, lastName, email, password, role) - Création d’un user
router.post('/signup', auth.optional, indexController.index_signup_post)

// body(email, password) - Authentification d’un user
router.post('/login', auth.optional, indexController.index_login_post)

module.exports = router
