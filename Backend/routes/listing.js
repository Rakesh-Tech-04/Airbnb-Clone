import express from "express"
import { wrapAsync } from "../middleware/wrapAsync.js"
import { createListing, deleteListing, updateListing, searchListing, getListings, getUserListings, getListingById } from "../controller/listing.js"
import { verifyToken } from "../middleware/authentication.js"
import upload from "../middleware/multer.js"
import { checkBookingAvailability } from "../controller/booking.js"
const router = express.Router()

router
    .route('/')
    .get(wrapAsync(getListings))
    .post(verifyToken, upload.array('images', 3), wrapAsync(createListing))

router.get('/my', verifyToken, wrapAsync(getUserListings))

router.get('/searchListing', wrapAsync(searchListing))

router
    .route('/:listingId')
    .get(wrapAsync(getListingById))
    .put(verifyToken, upload.array('images', 3), wrapAsync(updateListing))
    .delete(verifyToken, wrapAsync(deleteListing))

router.get('/:listingId/bookings', wrapAsync(checkBookingAvailability))

export default router