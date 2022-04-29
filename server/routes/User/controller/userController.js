const User = require('../model/User')
const bcrypt = require('bcryptjs')
const { errorHandler } = require('../lib/errorHandler')

//  Create user
const createUser = async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body
    try {
        let salt = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashPassword
        })
        const savedUser = await newUser.save()
        res.status(200).json({ message: "New user has been saved", payload: savedUser })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: errorHandler(error) })
    }
}

// Get all users
const getAllUsers = async (req, res) => {
    try {
        let allUsers = await User.find()
        res.status(200).json({ payload: allUsers })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err })
    }
}

//  Get current user
const getCurrentUser = async (req, res) => {
    const { id } = req.params
    try {
        const foundUser = await User.findOne({ id }).populate("movieHistory")
        res.status(200).json({ message: "Current user, movie history and comment history", payload: foundUser })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err })
    }
}

//  Update user
const updateUser = async (req, res) => {
    const { id } = req.params
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashPassword

        const updatedUser = await User.findOneAndUpdate({ id }, req.body, { new: true })
        if(updateUser === null) throw new Error("No user with id found")
        res.status(200).json({ message: "Updated user", payload: updatedUser })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: errorHandler(error) })
    }
}

//  Delete user
const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        let deleteUser = await User.findByIdAndDelete(id)
        if(deleteUser === null) throw new Error("No user with id found!")
        res.status(200).json({ message: "User has been deleted", payload: deleteUser })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err.message })
    }
}

//  User login
const userLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const foundUser = await User.findOne({ email: email })
        if(foundUser === null) throw { message: "Email not found!" }

        const comparedPassword = await bcrypt.compare(password, foundUser.password)
        if(!comparedPassword) throw { message: "Password does not match!" }

        res.status(200).json({ payload: foundUser })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getCurrentUser,
    updateUser,
    deleteUser,
    userLogin
}