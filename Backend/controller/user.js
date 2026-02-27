const bcrypt = require('bcrypt')
const User = require('../models/user')
const { generateToken } = require('../middleware/authentication.js')
const jwt = require("jsonwebtoken")

module.exports.signup = async (req, res) => {
    let { email, password, name } = req.body
    if (!email || !password || !name) return res.status(400).json("Invalid Inputs")
    password = await bcrypt.hash(password, 10)
    let newUser = new User({ email, password, name })
    let playload = {
        id: newUser._id,
        name: name,
    }
    let token = generateToken(playload)
    res.cookie("airbnbToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    })
    await newUser.save()
    res.status(201).json(playload)
}

module.exports.login = async (req, res) => {
    let { email, password } = req.body
    if (!email || !password) return res.status(400).json("Invalid Inputs")
    let user = await User.findOne({ email })
    if (!user) return res.status(400).json("Invalid requirement")
    let isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json("Invalid requirement")
    let playload = {
        id: user._id,
        name: user.name
    }
    let token = generateToken(playload)
    res.cookie("airbnbToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    })
    res.status(200).json(playload)
}

module.exports.logout = async (req, res) => {
    res.clearCookie('airbnbToken', {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    })
    res.status(204).json('done')
}

module.exports.authStatus = async (req, res) => {
    try {
        let token = req.cookies.airbnbToken
        if (!token) return res.json(null)
        let user = jwt.verify(token, process.env.JWTSECRETCODE)
        res.json(user)
    }
    catch {
        res.json(null)
    }
}

