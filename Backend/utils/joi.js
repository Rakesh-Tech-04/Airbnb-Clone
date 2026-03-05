const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(3)
        .required(),
    description: Joi.string()
        .trim()
        .min(10)
        .max(500)
        .optional()
        .allow(''),
    rent: Joi.number()
        .integer()
        .min(1000)
        .max(1000000)
        .required(),
    city: Joi.string()
        .trim()
        .min(2)
        .required(),
    landmark: Joi.string()
        .trim()
        .min(2)
        .required(),
    image: Joi.array()
        .items(
            Joi.object({
                url: Joi.string().uri().required(),
                publicId: Joi.string().optional(),
                _id: Joi.string().optional()
            })
        )
        .required(),
    describe: Joi.string()
        .optional()
})

module.exports.reviewSchema = Joi.object({
    rating: Joi.number()
        .min(1)
        .max(5)
        .integer()
        .required(),
    comment: Joi.string()
        .trim()
        .min(2)
        .required(),
    // listing: Joi.string()
    //     .pattern(/^[0-9a-fA-F]{24}$/)
    //     .required()
})

module.exports.bookingSchema = Joi.object({
    listing: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required(),
    fromDate: Joi.date()
        .min('now')
        .required(),
    toDate: Joi.date()
        .greater(Joi.ref('fromDate'))
        .required()
})