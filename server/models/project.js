let mongoose = require('mongoose')
let Schema = mongoose.Schema

let ProjectSchema = new Schema(
  {
    project_title: {
      type: String,
      required: [true, 'project title is mandatory']
    },
    project_content: {
      type: String,
      required: [true, 'project content is mandatory']
    },
    project_vote:
      [{ type: mongoose.Schema.Types.ObjectId, ref: 'user',unique : true }
    ]
    ,
    project_date: {
      type: Date,
      default: Date.now,
      validate: [(v) => v instanceof Date, 'project date shall be a date.']
    },
    project_image: {
      type: String,
      default: ''
    },
    project_course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'project\'s associated course is mandatory']
    }, // reference to the associated course
    project_user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'project\'s associated user is mandatory']
    } // reference to the associated user
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
)

ProjectSchema
  .virtual('project_virtual_content_introduction')
  .get(function () {
    return this.project_content.slice(0, 15)
  })

// Export model
module.exports = mongoose.model('Project', ProjectSchema)
