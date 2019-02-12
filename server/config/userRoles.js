let Enum = require('enum')

let userRoleEnum = new Enum({
  'admin': 1,
  'teacher': 2,
  'student': 3
},
{ ignoreCase: true }
)

let arrayUserRoles = []

userRoleEnum.enums.forEach(function (enumItem) {
  arrayUserRoles.push(enumItem.value)
})
let errorMessage = 'user role shall be one of these values: ' + arrayUserRoles

module.exports = {
  userRoleEnum: userRoleEnum,
  errorMessage: errorMessage,
  arrayUserRoles: arrayUserRoles
}
