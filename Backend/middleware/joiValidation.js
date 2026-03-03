const { reviewSchema, bookingSchema } = require("../utils/joi")
const ExpressError = require("../utils/ExpressError")

module.exports.reviewValidation = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body, {
        abortEarly: false,
        allowUnknown: false
    })
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(', ');
        return next(new ExpressError(400, errmsg))
    }
    else {
        next()
    }
}

module.exports.bookingValidation = (req, res, next) => {
    let { error } = bookingSchema.validate(req.body, {
        abortEarly: false,
        allowUnknown: false
    })
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(', ');
        return next(new ExpressError(400, errmsg))
    }
    else {
        next()
    }
}