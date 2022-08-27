const Comment = require('../model/Comment')
const Movie = require('../../Movie/model/Movie')
const User = require('../../User/model/User')

//  Create comment
const createComment = async (req, res) => {
    const decodedToken = res.locals.decodedToken
    const { comment } = req.body
    const { id } = req.params

    try {
        const foundUser = await User.findOne({ _id: decodedToken._id })
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
        res.status(500).json({ message: "error", error: err.message })
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
        res.status(500).json({ message: "error", error: err.message })
    }
}

//  Update comment
const updateComment = async (req, res) => {
    const decodedToken = res.locals.decodedToken
    const { id } = req.params

    try {
        const foundUser = await User.findOne({ _id: decodedToken._id })
        if(!foundUser) throw { message: "User not found" }
        const foundComment = await Comment.findById(id).populate("commentOwner")
        if(!foundComment) throw { message: "Comment not found" }

        if(foundUser._id.toString() === foundComment.commentOwner.toString()) {
            const updatedComment = await Comment.findByIdAndUpdate(id, req.body, { new: true })
            res.status(200).json({ message: "Comment has been updated", payload: updatedComment })
        }
        else {
            throw { message: "You do not have permission!" }
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err.message })
    }
}

//  Delete comment
const deleteComment = async (req, res) => {
    const decodedToken = res.locals.decodedToken
    const { id } = req.params
    
    try {
        const foundComment = await Comment.findById(id)
        if(!foundComment) throw { message: "Comment not found" }
        const deletedComment = await Comment.findByIdAndDelete(id)
        if(!deletedComment) throw { message: "No comment with id found!"}
        const foundUser = await User.findOne({ _id: decodedToken._id })
        if(!foundUser) throw { message: "User not found" }
        const foundMovie = await Movie.findById(deletedComment.movie)
        if(!foundMovie) throw { message: "Movie not found" }

        if(foundUser._id.toString() === foundComment.commentOwner.toString()) {
            foundUser.commentHistory.pull(id)
            foundMovie.commentHistory.pull(id)
            await foundUser.save()
            await foundMovie.save()
            res.status(200).json({ message: "Comment has been deleted", payload: deletedComment })
        }
        else {
            throw { message: "You do not have permission!" }
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err.message })
    }
}

module.exports = {
    createComment,
    getAllComments,
    updateComment,
    deleteComment
}