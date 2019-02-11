<<<<<<< HEAD
let jwt = require('express-jwt')

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req
  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1]
  }
  return null
}

const auth = {
  required: jwt({
    secret: process.env.SECRET,
    userProperty: 'payload',
    getToken: getTokenFromHeaders
  }),
  optional: jwt({
    secret: process.env.SECRET,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  })
}

module.exports = auth
=======
const router = require('express').Router()
var users = require('../models/user');

router.post('/register', async (req, res) => {
    console.log('im here')
    let lvl = 0;
    const number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const majus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const min = "abcdefghijklmnopqrstuvwxyz";
    let password = req.body.password;
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
      const result = await users.create(req.body).catch(err => err)
      exports.create = async function () {
        return await users.save()
          .then((result) => {
            console.log(result);
          }).catch((err) => {
            console.log(err)
          });
      };
       
      res.send({msg: 'Welcome to our website'})
    }
    else {
      level = "Your password must contain at least 8 characters and less then 20";
      res.send(level)
  
    }
  
  })
  module.exports = router;
>>>>>>> 771111719010f36278c3431838ea118098cb4be8
