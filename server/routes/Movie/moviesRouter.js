var express = require('express')
var router = express.Router()
const { createMovie, getAllUsersMovies, getOneMovie, updateMovie } = require('./controller/movieController')

router.post('/create-movie', createMovie)
router.get('/get-all-user-movies', getAllUsersMovies)
router.get('/get-one-movie/:id', getOneMovie)
router.put('/update-movie', updateMovie)

module.exports = router