let mongoose = require('mongoose')
let Schema = mongoose.Schema

let CommentSchema = new Schema(
  {
    comment_content: {
      type: String,
      required: [true, 'comment content is mandatory']
    },
    comment_user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'comment\'s associated user is mandatory']
    }, // reference to the associated user
    comment_date: {
      type: Date,
      default: Date.now,
      validate: [(v) => v instanceof Date, 'comment date shall be a date.']
    },
    comment_course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'comment\'s associated course is mandatory']
    }// reference to the associated course
  }
)

// Export model
module.exports = mongoose.model('Comment', CommentSchema)
