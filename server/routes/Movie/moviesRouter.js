var express = require('express')
var router = express.Router()

/* GET movies listing. */
router.get('/', function(req, res, next) {
    res.send('Hello World from Movie Router!')
})

module.exports = router