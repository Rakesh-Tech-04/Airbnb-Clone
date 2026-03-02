const listingSchema = require("../utils/joi")
const ExpressError = require("../middleware/ExpressError")

const listingValidation = (req, res, next) => {
    let { error } = listingSchema.validate(req.body, {
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

module.exports = listingValidation