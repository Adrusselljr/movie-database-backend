var express = require('express')
var router = express.Router()
const { createMovie, getAllUsersMovies, getOneMovie, updateMovie, deleteMovie } = require('./controller/movieController')

router.post('/create-movie/:id', createMovie)
router.get('/get-all-user-movies/:id', getAllUsersMovies)
router.get('/get-one-movie/:id', getOneMovie)
router.put('/update-movie/:id', updateMovie)
router.delete('/delete-movie/:id', deleteMovie)

module.exports = router