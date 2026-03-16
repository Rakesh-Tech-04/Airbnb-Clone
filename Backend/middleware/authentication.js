import jwt from "jsonwebtoken"
import ExpressError from "../utils/ExpressError.js"

export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWTSECRETCODE, { expiresIn: "3d" })
}

export const verifyToken = (req, res, next) => {
    let token = req.cookies.airbnbToken
    if (!token) {
        return next(new ExpressError(401, 'You need to login'))
    }
    try {
        let decode = jwt.verify(token, process.env.JWTSECRETCODE)
        req.user = decode
        next()
    }
    catch (err) {
        return next(new ExpressError(401, 'Invalid User'))
    }
}