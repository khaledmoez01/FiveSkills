let multer = require('multer')
let moment = require('moment')
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    // accept
    cb(null, true)
  } else {
    // reject
    cb(null, false)
  }
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, 'public/images/');
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, moment(new Date()).format('YYYYMMDDHHMMSS') + '_' + file.originalname)
    // cb(null, file.originalname);
  }
})
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})

module.exports = upload
