let mongoose = require('mongoose')

let Schema = mongoose.Schema
let bcrypt = require('bcryptjs')

let jwt = require('jsonwebtoken')
let userRoleEnum = require('../config/userRoles').userRoleEnum

let subSchemaFollowedCourse = new mongoose.Schema(
  {
    course_id: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'user\'s course is mandatory']
    }
  },
  {
    _id: false
  }
)

let UserSchema = new Schema(
  {
    user_first_name: {
      type: String,
      required: [true, 'user first name is mandatory']
    },
    user_family_name: {
      type: String,
      required: [true, 'user last name is mandatory']
    },
    user_email: {
      type: String,
      required: [true, 'user email is mandatory'],
      match: [/\S+@\S+\.\S+/, 'User email must be a valid mail format'],
      unique: true,
      index: true
    },
    user_password: {
      type: String,
      required: [true, 'user password is mandatory']
    },
    user_role: {
      type: Number,
      required: [true, 'user role is mandatory'],
      default: userRoleEnum.get('student').value,
      validate: [
        (v) => userRoleEnum.isDefined(v),
        require('../config/userRoles').errorMessage
      ]
    },
    user_followed_courses: [subSchemaFollowedCourse]
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
)

// Virtual for user's full name
UserSchema
  .virtual('user_virtual_full_name')
  .get(function () {
    return this.user_family_name + ', ' + this.user_first_name
  })

UserSchema.pre('save', function (next) {
  // this represente le user qui s'apprete a ete inséré
  // check if password is present and is modified.
  if (this.user_password && this.isModified('user_password')) {
    // call your hashPassword method here which will return the hashed password.
    this.user_password = bcrypt.hashSync(this.user_password, 8)
  }

  next() // everything is done, so let's call the next callback.
})

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.user_password)
}

UserSchema.methods.generateJWT = function () {
  const today = new Date()
  const expirationDate = new Date(today)
  expirationDate.setDate(today.getDate() + 60)

  return jwt.sign({
    email: this.user_email,
    id: this._id,
    role: this.user_role,
    exp: parseInt(expirationDate.getTime() / 1000, 10)
  }, process.env.SECRET)
}

// Export model
module.exports = mongoose.model('User', UserSchema)
