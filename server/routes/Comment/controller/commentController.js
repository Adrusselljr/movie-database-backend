const Comment = require('../model/Comment')
const Movie = require('../../Movie/model/Movie')
const User = require('../../User/model/User')

//  Create comment
const createComment = async (req, res) => {
    const { comment, email } = req.body
    const { id } = req.params
    try {
        const foundUser =  await User.findOne({ email })
        if(!foundUser) throw { message: "User not found" }
        const foundMovie = await Movie.findById(id)
        if(!foundMovie) throw { message: "Movie not found" }
        const newComment = new Comment({
            comment: comment,
            movie: id,
            commentOwner: foundUser._id
        })
        const savedComment = await newComment.save()
        foundUser.commentHistory.push(savedComment._id)
        foundMovie.commentHistory.push(savedComment._id)
        await foundUser.save()
        await foundMovie.save()
        res.status(200).json({ message: "Saved new comment", payload: savedComment })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err })
    }
}

// Get all comments
const getAllComments = async (req, res) => {
    const { id } = req.params
    try {
        const foundMovie =  await Movie.findOne({ id })
        if(!foundMovie) throw { message: "User not found" }
        const foundComments = await Comment.find({ movie: foundMovie._id  })
        res.status(200).json({ payload: foundComments })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err })
    }
}

//  Update comment
// const updteComment = async (req, res) => {
//     try {

//     }
//     catch (err) {
//         console.log(err)
//         res.status(500).json({ message: "error", error: err })
//     }
// }

module.exports = {
    createComment,
    getAllComments,
    // updteComment,
}