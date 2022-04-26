const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({

    comment: {
        type: String
    },

    movie: {
        type: mongoose.Schema.ObjectId,
        ref: "movie"
    },

    commentOwner: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    }

}, { timestamps: true })

module.exports = mongoose.model("comment", CommentSchema)