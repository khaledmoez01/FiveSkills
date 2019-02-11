let mongoose = require('mongoose')
let Schema = mongoose.Schema

let CourseSchema = new Schema()

// Export model
module.exports = mongoose.model('Course', CourseSchema)
