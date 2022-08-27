var express = require('express')
var router = express.Router()
const { createComment, getAllComments, updateComment, deleteComment } = require('./controller/commentController')
const { checkIsEmpty, jwtMiddleware } = require('../lib/index')

router.post('/create-comment/:id', checkIsEmpty, jwtMiddleware, createComment)
router.get('/get-all-comments/:id', getAllComments)
router.put('/update-comment', checkIsEmpty, jwtMiddleware, updateComment)
router.delete('/delete-comment/:id', jwtMiddleware, deleteComment)

module.exports = router