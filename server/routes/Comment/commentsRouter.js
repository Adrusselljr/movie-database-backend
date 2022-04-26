var express = require('express')
var router = express.Router()
const { createComment, getAllComments } = require('./controller/commentController')

router.post('/create-comment/:id', createComment)
router.get('/get-all-comments/:id', getAllComments)

module.exports = router