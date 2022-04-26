const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    username: {
        type: String,
        unique: true
    },
    
    email: {
        type: String,
        unique: true
    },

    password: {
        type: String
    },

    movieHistory: [{
        type: mongoose.Schema.ObjectId,
        ref: "movie"
    }],

    commentHistory: [{
        type: mongoose.Schema.ObjectId,
        ref: "comment"
    }]

}, { timestamps: true })

module.exports = mongoose.model("user", UserSchema)