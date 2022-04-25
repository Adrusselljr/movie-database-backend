var express = require('express')
var router = express.Router()
const { createUser, getAllUsers, getOneUser } = require('./controller/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Hello World from User Router!')
})

router.post('/create-user', createUser)
router.get('/get-all-users', getAllUsers)
router.get('/get-one-user/:id', getOneUser)

module.exports = router