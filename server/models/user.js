<<<<<<< HEAD
let mongoose = require('mongoose')
let Schema = mongoose.Schema

let UserSchema = new Schema()

// Export model
module.exports = mongoose.model('User', UserSchema)
=======
const mongoose = require('mongoose');
bcrypt = require('bcrypt-nodejs'),
SALT_WORK_FACTOR = 10;


var usersSchema = new mongoose.Schema({
    firstname: {
      type: String
  
    },
    lastname: {
      type: String
  
    },
    birthday: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      required: true
  
    }
  });
  usersSchema.pre('save', function() {
    console.log(this.password);
    this.password = bcrypt.hashSync(this.password);
    console.log(this.password);
  }); 
  usersSchema.path('email').validate( (val)=> {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(val);
  }, 'Valid E-mail please.');
  module.exports = mongoose.model('users', usersSchema);
>>>>>>> 771111719010f36278c3431838ea118098cb4be8
