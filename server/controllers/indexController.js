var User = require('../models/user');
<<<<<<< HEAD
let bcrypt=require('bcrypt-nodejs');
=======
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

>>>>>>> fe27c6abb94209b3b37dddd24b488f3c30ec9462
// body(firstName, lastName, email, password, role) - Création d’un user
exports.index_signup_post = [
  async (req, res, next) => {
    req.body.user_image = req.file.filename;
    console.log('im here')
    let lvl = 0;
    const number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const majus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const min = "abcdefghijklmnopqrstuvwxyz";
    let password = req.body.user_password;
    if (password.length >= 8 && password.length <= 20) {
      for (let i = 0; i < password.length; i++) {
        const element = password[i];
        if (number.includes(element)) {
          lvl++;
          break;
        }
      }
      for (let i = 0; i < password.length; i++) {
        const element = password[i];
        if (majus.includes(element)) {
          lvl++;
          break;
        }
      }
      for (let i = 0; i < password.length; i++) {
        const element = password[i];
        if (min.includes(element)) {
          lvl++;
          break;
        }
      }
      level = (lvl == 1) ? "easy" : (lvl == 2) ? "Soft" : (lvl == 3) ? "Hard" : "";
      console.log(level)
      const result = await User.create(req.body).catch(err => err)

      res.send({ msg: result })
    }
    else {
      level = "Your password must contain at least 8 characters and less then 20";
      res.send(level)

    }

  }
]

// body(email, password) - Authentification d’un user
exports.index_login_post = [
  async (req, res, next) => {

    console.log(req.body.email);
    let Email = req.body.user_email;
    let Password = req.body.user_password
    const result = await User.findOne({ user_email: Email })
    console.log(result);
    if (result && bcrypt.compareSync(Password, result.user_password)) {
      const token = jwt.sign({id: result.user_email}, 'user');
        res.send( {lvl : 'Your connexion is valide', token:token});
    }
    else {
        res.send( {lvl : ' Please verify your Email or Password '});
    };
  }
]
