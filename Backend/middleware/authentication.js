const jwt = require("jsonwebtoken")

module.exports.generateToken = (playload) => {
    return jwt.sign(playload, process.env.JWTSECRETCODE)
}

module.exports.verifyToken = (req, res, next) => {
    let token = req.cookies.airbnbToken
    if (!token) return res.status(401).json({ message: 'You need to login' })
    try {
        let decode = jwt.verify(token, process.env.JWTSECRETCODE)
        req.user = decode
        next()
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalide user' })
    }
}