import { reviewSchema, bookingSchema } from "../utils/joi.js"
import ExpressError from "../utils/ExpressError.js"

export const reviewValidation = (req, res, next) => {
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

export const bookingValidation = (req, res, next) => {
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