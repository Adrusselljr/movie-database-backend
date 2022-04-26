const Movie = require('../model/Movie')
const User = require('../../User/model/User')

//  Create movie
const createMovie = async (req, res) => {
    const { locationId, title, description, genre, rating, director, stars, runtime, yearReleased, email } = req.body
    const foundUser =  await User.findOne(email)
        if(!foundUser) throw { message: "User not found" }
    try {
        const newMovie = new Movie({
            locationId: locationId,
            title: title,
            description: description,
            genre: genre,
            rating: rating,
            director: director,
            stars: stars,
            runtime: runtime,
            yearReleased: yearReleased,
            movieOwner: foundUser._id
        })
        const savedMovie = await newMovie.save()
        foundUser.movieHistory.push(savedMovie._id)
        await foundUser.save()
        res.status(200).json({ message: "Saved new movie", payload: savedMovie })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err })
    }
}

//  Get all movies from user
const getAllUsersMovies = async (req, res) => {
    const { email } = req.body
    try {
        const foundUser = await User.findOne({ email })
        if(!foundUser) throw { message: "User not found!" }
        const foundMovies = await Movie.find({ movieOwner: foundUser._id })
        res.status(200).json({ payload: foundMovies })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err })
    }
}

//  Get one movie
const getOneMovie = async (req, res) => {
    const { id } = req.params
    try {
        let oneMovie = await Movie.findById(id)
        res.status(200).json({ payload: oneMovie })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err })
    }
}

// Update movie
const updateMovie = async (req, res) => {
    const { movieId, email } = req.body
    try {
        const foundUser =  await User.findOne({ email })
        if(!foundUser) throw { message: "User not found" }
        const foundMovie = await Movie.findById(movieId)
        if(!foundMovie) throw { message: "Movie not found" }

        if(foundUser._id.toString() === foundMovie.movieOwner.toString()) {
            const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body, { new: true })
            res.status(200).json({ message: "Movie has been updated", payload: updatedMovie })
        }
        else {
            throw { message: "You do not have permission!" }
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err })
    }
}

//  Delete movie
// const deleteMovie = async (req, res) => {
//     const { movieId } = req.params
//     const { email } = req.body
//     try {
//         const foundUser =  await User.findOne({ email })
//         if(!foundUser) throw { message: "User not found" }
//         const foundMovie = await Movie.findById(movieId)
//         if(!foundMovie) throw { message: "Movie not found" }

//         if(foundUser._id.toString() === foundMovie.movieOwner.toString()) {
//             const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body, { new: true })
//             res.status(200).json({ message: "Movie has been updated", payload: updatedMovie })

            
//         }
//         else {
//             throw { message: "You do not have permission!" }
//         }
//     }
//     catch (err) {
//         console.log(err)
//         res.status(500).json({ message: "error", error: err })
//     }
// }

module.exports = {
    createMovie,
    getAllUsersMovies,
    getOneMovie,
    updateMovie,
    // deleteMovie
}