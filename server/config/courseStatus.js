let Enum = require('enum')

let courseStatusEnum = new Enum({
  'draft': 1,
  'pending': 2,
  'published': 3,
  'rejected': 4
},
{ ignoreCase: true }
)

let errorMessage = 'course status shall be one of these values: '
courseStatusEnum.enums.forEach(function (enumItem) {
  errorMessage += enumItem.value + '-'
})

module.exports = {
  courseStatusEnum: courseStatusEnum,
  errorMessage: errorMessage
}
