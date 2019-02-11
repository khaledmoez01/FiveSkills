let mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    user_first_name: {
      type: String
  
    },
    user_last_name: {
      type: String
  
    },
    user_birthday: {
      type: Date
    },
    user_image:  String,

    user_email: {
      type: String,
      unique: true
    },
    user_password: {
      type: String,
      required: true
  
    }
  });
  UserSchema.pre('save', function() {
    console.log(this.user_password);
    this.user_password = bcrypt.hashSync(this.user_password);
    console.log(this.user_password);
  }); 
  UserSchema.path('user_email').validate( (val)=> {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(val);
  }, 'Valid E-mail please.');
  module.exports = mongoose.model('users', UserSchema);
