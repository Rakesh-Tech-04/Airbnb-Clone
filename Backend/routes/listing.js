import express from "express"
import { wrapAsync } from "../middleware/wrapAsync.js"
import { createListing, deleteListing, renderListing, updateListing, selectedListing, searchListing, myListing } from "../controller/listing.js"
import { verifyToken } from "../middleware/authentication.js"
import upload from "../middleware/multer.js"
const listingRouter = express.Router()

listingRouter
    .route('/')
    .get(wrapAsync(renderListing))
    .post(verifyToken, upload.array('images', 3), wrapAsync(createListing))

listingRouter.get('/searchListing', wrapAsync(searchListing))

listingRouter.get('/mylisting', verifyToken, wrapAsync(myListing))

listingRouter
    .route('/:listingId')
    .get(wrapAsync(selectedListing))
    .put(verifyToken, upload.array('images', 3), wrapAsync(updateListing))
    .delete(verifyToken, wrapAsync(deleteListing))


export default listingRouter