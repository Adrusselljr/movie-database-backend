const User = require('../model/User')

//  Create user
const createUser = async (req, res) => {
    const { firstName, lastName, username, email } = req.body
    try {
        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email
        })
        const savedUser = await newUser.save()
        res.status(200).json({ message: "New user has been saved", payload: savedUser })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err })
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

//  Get one user
const getOneUser = async (req, res) => {
    const { id } = req.params
    try {
        let oneUser = await User.findById(id)
        res.status(200).json({ payload: oneUser })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err })
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getOneUser
}