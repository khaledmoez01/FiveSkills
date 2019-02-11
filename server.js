const express = require('express')

const cors = require('cors')
const app = express()
app.use(cors());

const bodyparser = require('body-parser');
app.use(bodyparser.json());


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fiveSkills');


const auth = require('./routes/auth')
app.use('/auth', auth)

const admin = require('./routes/admin')
app.use('/admin', admin)

const api = require('./routes/api')
app.use('/api', api)

app.listen(3000, (err) => {
    if (err) throw err;
    console.log('server is running on port 3000')
})