const express = require('express')
const router = express.Router()
const { createMovie, getAllUsersMovies, getOneMovie, updateMovie, deleteMovie } = require('./controller/movieController')
const { jwtMiddleware, checkIsEmpty } = require('../lib/index')

router.post('/create-movie', checkIsEmpty, jwtMiddleware, createMovie)
router.get('/get-all-user-movies', jwtMiddleware, getAllUsersMovies)
router.get('/get-one-movie/:id', getOneMovie)
router.put('/update-movie/:id', jwtMiddleware, checkIsEmpty, updateMovie)
router.delete('/delete-movie/:id', jwtMiddleware, deleteMovie)

module.exports = router