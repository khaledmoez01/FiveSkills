let mongoose = require('mongoose')
let Schema = mongoose.Schema

let UserSchema = new Schema()

// Export model
module.exports = mongoose.model('User', UserSchema)
