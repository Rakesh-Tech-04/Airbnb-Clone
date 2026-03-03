const express = require('express')
const { verifyToken } = require('../middleware/authentication')
const { reviewValidation } = require('../middleware/joiValidation')
const { wrapAsync } = require('../middleware/wrapAsync')
const { createReview, renderReview, deleteReview } = require('../controller/Review')
const reviewRouter = express.Router({ mergeParams: true })

reviewRouter
    .route('/')
    .get(wrapAsync(renderReview))
    .post(verifyToken, reviewValidation, wrapAsync(createReview))

reviewRouter
    .route('/:reviewId')
    .delete(verifyToken, wrapAsync(deleteReview))

module.exports = reviewRouter