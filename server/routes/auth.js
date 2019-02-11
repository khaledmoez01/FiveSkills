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

    res.send({ msg: 'Welcome to our website' })
  }
  else {
    level = "Your password must contain at least 8 characters and less then 20";
    res.send(level)

  }

})

router.post('/login', async (req, res) => {

  console.log(req.body.email);
  let Email = req.body.email;
  let Password = req.body.password
  const result = await users.findOne({ email: Email })
  console.log(result);
  if (result && bcrypt.compareSync(Password, result.password)) {
    res.send({ lvl: 'Your connexion is valide' });
  }
  else {
    res.send({ lvl: ' Please verify your Email or Password ' });
  };
});





module.exports = router;