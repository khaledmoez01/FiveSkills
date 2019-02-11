const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/FiveSkills', {
    useNewUrlParser: true,
    useCreateIndex: true,
}, (err) => {
    if (!err) {
        console.log('connected to database successfully');
    } else {
        console.log('Error while connection:' + err);
    }
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  const users = require('./server/models/user')
app.use('/users', users)
const auth = require('./server/routes/auth')
app.use('/auth', auth)
app.listen(3000, (err => {
    if (err) throw err;
    console.log('server is running on port 3000')
}))