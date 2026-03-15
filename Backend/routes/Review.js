import express from 'express'
import { verifyToken } from '../middleware/authentication.js'
import { reviewValidation } from '../middleware/joiValidation.js'
import { wrapAsync } from '../middleware/wrapAsync.js'
import { createReview, renderReview, deleteReview } from '../controller/Review.js'
const reviewRouter = express.Router({ mergeParams: true })

reviewRouter
    .route('/')
    .get(wrapAsync(renderReview))
    .post(verifyToken, reviewValidation, wrapAsync(createReview))

reviewRouter
    .route('/:reviewId')
    .delete(verifyToken, wrapAsync(deleteReview))

export default reviewRouter