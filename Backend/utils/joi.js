const Joi = require('joi');

const listingSchema = Joi.object({
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
    describe: Joi.array()
        .items(Joi.string())
        .optional()


})

module.exports = listingSchema