let mongoose = require('mongoose')
let courseStatusEnum = require('../config/courseStatus').courseStatusEnum
let Schema = mongoose.Schema

let subSchemaFollowers = new mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'course\'s user is mandatory']
    }
  },
  {
    _id: false
  }
)

let CourseSchema = new Schema(
  {
    course_title: {
      type: String,
      required: [true, 'course title is mandatory']
    },
    course_image:  {type :String},
    course_date: {
      type: Date,
      default: Date.now,
      validate: [(v) => v instanceof Date, 'course date shall be a date.']
    },
    course_teacher: {
      type: Schema.Types.ObjectId,
      ref: 'User', // reference to the associated user
      required: [true, 'course teacher is mandatory']
    },
    course_content: { // les video associees
      type: String
    },
    course_description: { // le projet a implementer par les students
      type: String,
      required: [true, 'course description is mandatory']
    },
    course_statement: { // l'enonce du cours - 'about this class'
      type: String,
      required: [true, 'course statement is mandatory']
    },
    course_status: {
      type: Number,
      required: [true, 'course status is mandatory'],
      default: courseStatusEnum.get('draft').value,
      validate: [
        (v) => courseStatusEnum.isDefined(v),
        require('../config/courseStatus').errorMessage
      ]
    },
    course_followers: [subSchemaFollowers],
    course_project:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    course_comment:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
)

CourseSchema
  .virtual('course_virtual_statement_introduction')
  .get(function () {
    return this.course_statement.slice(0, 25)
  })

// Export model
module.exports = mongoose.model('Course', CourseSchema)
