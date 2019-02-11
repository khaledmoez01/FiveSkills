let passport = require('passport')
let LocalStrategy = require('passport-local')
let User = require('../models/user')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // 'user[email]',
      passwordField: 'password' // 'user[password]'
    },
    (email, password, done) => {
      User.findOne({ user_email: email }).then((user) => {
        if (!user || !user.comparePassword(password)) {
          return done(null, false, { errors: 'email or password is invalid' })
        }

        return done(null, user)
      }).catch(done)
    }
  )
)
