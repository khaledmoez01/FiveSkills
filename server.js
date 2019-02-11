<<<<<<< HEAD
let createError = require('http-errors')
let express = require('express')
let swaggerUi = require('swagger-ui-express')
let swaggerDocument = require('./server/swagger.json')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
let compression = require('compression')
let helmet = require('helmet') // protection des vulnerabilites
let cors = require('cors')

let indexRouter = require('./server/routes/index')
let adminRouter = require('./server/routes/admin')
let imageDownloadRouter = require('./server/routes/imageDownload')
let userRouter = require('./server/routes/user')
let studentRouter = require('./server/routes/student')

let app = express()
app.use(helmet())
app.use(cors())
// Set up mongoose connection
let mongoose = require('mongoose')
let mongoDB = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME
mongoose.connect(mongoDB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
)
mongoose.set('useCreateIndex', true)
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

require('./server/config/passport')

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
  // use morgan to log at command line
  app.use(logger('dev'))
}
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())

app.use(compression()) // Compress all routes

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter) // routes accessibles par tous pour le signup et le login
app.use('/admin', adminRouter) // routes reservees aux admin
app.use('/user', userRouter) // routes reservees aux students et aux teachers
app.use('/student', studentRouter) // routes reservees aux students seulement
app.use('/uploads', imageDownloadRouter) // route pour telecharger une image depuis le dossier /uploads
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(err.status).send({ code: err.status, message: err.message })
  }
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(process.env.PORT, function () {
  console.log('Express server listening on port ' + process.env.PORT)
})

module.exports = app
=======
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
>>>>>>> 771111719010f36278c3431838ea118098cb4be8
