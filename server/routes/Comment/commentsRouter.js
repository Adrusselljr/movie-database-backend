var express = require('express')
var router = express.Router()
const { createComment, getAllComments, updteComment, deleteComment } = require('./controller/commentController')

router.post('/create-comment/:id', createComment)
router.get('/get-all-comments/:id', getAllComments)
router.put('/update-comment', updteComment)
router.delete('/delete-comment/:id', deleteComment)

module.exports = router