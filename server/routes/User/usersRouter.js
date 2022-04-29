var express = require('express')
var router = express.Router()
const { createUser, getAllUsers, getCurrentUser, updateUser, deleteUser, userLogin } = require('./controller/userController')
const { checkIsEmpty, validateCreate, validateUpdate, validateLogin } = require('./lib/index')

router.post('/create-user', validateCreate, checkIsEmpty, createUser)
router.get('/get-all-users', getAllUsers)
router.get('/get-current-user/:id', getCurrentUser)
router.put('/update-user/:id', checkIsEmpty, validateUpdate, updateUser)
router.delete('/delete-user/:id', deleteUser)
router.post('/login', checkIsEmpty, validateLogin, userLogin)

module.exports = router