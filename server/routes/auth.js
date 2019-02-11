const router = require('express').Router()
var users = require('../models/user');
const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'server/image/upload')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
var upload = multer({ storage: storage });

router.post('/register', upload.single('image'), async (req, res) => {
    req.body.image = req.file.filename;
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
  router.get('/user/image/:name', upload.single('image'), async (req, res) => {
    res.sendFile('C:\\Users\\emna\\Desktop\\projet Niveau 3\\FiveSkills\\server\\image\\upload\\' + req.params.name)
})
  module.exports = router;