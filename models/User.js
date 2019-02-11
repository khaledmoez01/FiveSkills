var mongoose = require('mongoose');
 var bcrypt = require('bcryptjs');
var validate = require('mongoose-validator')

//   var hashedPassword = bcrypt.hashSync(req.body.password, 8);
// password : hashedPassword
var Schema = mongoose.Schema;


var user_firstNameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Name should contain alpha-numeric characters only',
  }),
]


var user_lastNameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Name should contain alpha-numeric characters only',
  }),
]



/*var user_passwordValidator = function (user_password) {
  var re = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  return re.test(user_password)  
  };
  */

  /*Et voici mon expression de validation qui
   est pour huit caractères comprenant une lettre majuscule, 
   une lettre minuscule, et un nombre ou un caractère spécial.*/




   // var hashedPassword = bcrypt.hashSync(req.body.user_password, 8);

var UserSchema = new Schema({

  user_firstName: { type: String, required: true, validate: user_firstNameValidator },
  user_lastName: { type: String, required: true, validate: user_lastNameValidator },
  user_email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email address is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

  },
  user_password: {
    type: String,
    required: [true,'password is required']
   // ,validate: [user_passwordValidator, 'Please fill a valid password'],
  },
  user_role: enum_role ,
  user_coursesFollowing:[{type:ObjectId,ref:'Course'}]

});
UserSchema.pre('save',function(next){
  var User=this;
  bcrypt.hash(User.user_password,10,function(err,hash){
    if(err){
      return next(err);
    }
    User.user_password=hash;
    next();
    
  })
})
var User = mongoose.model('User', UserSchema);
module.exports = User;