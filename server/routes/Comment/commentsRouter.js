var express = require('express')
var router = express.Router()

/* GET comments listing. */
router.get('/', function(req, res, next) {
    res.send('Hello World from Comment Router!')
})

module.exports = router