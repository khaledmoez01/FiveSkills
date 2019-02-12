let mongoose = require('mongoose')
let Schema = mongoose.Schema

let ProjectSchema = new Schema()

// Export model
module.exports = mongoose.model('Project', ProjectSchema)
