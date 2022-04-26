const { checkIsEmpty } = require('./checkIsEmpty')
const { validateCreate } = require('./validateCreate')
const { validateUpdate } = require('./validateUpdate')
const { validateLogin } = require('./validateLogin')

module.exports = {
    checkIsEmpty,
    validateCreate,
    validateUpdate,
    validateLogin
}