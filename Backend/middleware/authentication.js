import jwt from "jsonwebtoken"
import ExpressError from "../utils/ExpressError.js"

export const generateToken = (playload) => {
    return jwt.sign(playload, process.env.JWTSECRETCODE)
}

export const verifyToken = (req, res, next) => {
    let token = req.cookies.airbnbToken
    if (!token) next(new ExpressError(401, 'You need to login'))
    try {
        let decode = jwt.verify(token, process.env.JWTSECRETCODE)
        req.user = decode
        next()
    }
    catch (err) {
        next(new ExpressError(401, 'Invalid User'))
    }
}