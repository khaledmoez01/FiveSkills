let mongoose = require('mongoose')
let Schema = mongoose.Schema

let CommentSchema = new Schema()

// Export model
module.exports = mongoose.model('Comment', CommentSchema)
