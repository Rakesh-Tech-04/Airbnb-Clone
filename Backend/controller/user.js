import bcrypt from 'bcrypt'
import User from '../models/user.js'
import { generateToken } from '../middleware/authentication.js'
import jwt from "jsonwebtoken"
import ExpressError from '../utils/ExpressError.js'

export const signup = async (req, res) => {
    let { email, password, name } = req.body
    if (!email || !password || !name) throw new ExpressError(400, "Email,Name and Password required")

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
        sameSite: "none"
    })
    await newUser.save()
    res.status(201).json({ success: true, user: playload, message: 'Welcome To Airbnb' })
}

export const login = async (req, res) => {
    let { email, password } = req.body
    if (!email || !password) throw new ExpressError(400, "Email and password required");

    let user = await User.findOne({ email })
    if (!user) throw new ExpressError(401, "Invalid email or password")
    let isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new ExpressError(401, "Invalid email or password")
    let playload = {
        id: user._id,
        name: user.name
    }
    let token = generateToken(playload)
    res.cookie("airbnbToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })
    res.status(200).json({ success: true, user: playload, message: 'You Logged In' })
}

export const logout = async (req, res) => {
    res.clearCookie('airbnbToken', {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })
    res.status(200).json({ success: true, message: "You Logged Out" })
}

export const authStatus = async (req, res) => {
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

