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
        const foundMovieInfo = await foundMovie.populate({path: "commentHistory", populate: {path: "commentOwner"}})
        console.log("foundMovieInfo ", foundMovieInfo)
        res.status(200).json({ message: "Saved new comment", payload: foundMovieInfo })
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
        if(!foundMovie) throw { message: "Movie not found" }
        const foundComments = await Comment.find({ movie: foundMovie._id  }).populate('commentOwner')
        res.status(200).json({ payload: foundComments })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err })
    }
}

//  Update comment
const updteComment = async (req, res) => {
    const { commentId, email } = req.body

    try {
        const foundUser =  await User.findOne({ email })
        if(!foundUser) throw { message: "User not found" }
        const foundComment = await Comment.findById(commentId)
        if(!foundComment) throw { message: "Comment not found" }

        if(foundUser._id.toString() === foundComment.commentOwner.toString()) {
            const updatedComment = await Comment.findByIdAndUpdate(commentId, req.body, { new: true })
            res.status(200).json({ message: "Comment has been updated", payload: updatedComment })
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

//  Delete comment
const deleteComment = async (req, res) => {
    const { id } = req.params
    const { email } = req.body
    
    try {
        const foundComment = await Comment.findById(id)
        if(!foundComment) throw { message: "Comment not found" }
        const deleteComment = await Comment.findByIdAndDelete(id)
        if(!deleteComment) throw { message: "No comment with id found!"}
        const foundUser = await User.findOne({ email })
        if(!foundUser) throw { message: "User not found" }
        const foundMovie = await Movie.findById(deleteComment.movie)
        if(!foundMovie) throw { message: "Movie not found" }

        if(foundUser._id.toString() === foundComment.commentOwner.toString()) {
            foundUser.commentHistory.pull(id)
            foundMovie.commentHistory.pull(id)
            await foundUser.save()
            await foundMovie.save()
            res.status(200).json({ message: "Comment has been deleted", payload: deleteComment })
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

module.exports = {
    createComment,
    getAllComments,
    updteComment,
    deleteComment
}