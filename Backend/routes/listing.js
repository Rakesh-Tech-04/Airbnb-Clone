const express = require("express")
const { wrapAsync } = require("../middleware/wrapAsync")
const { createListing, deleteListing, renderListing, updateListing, selectedListing, searchListing, myListing } = require("../controller/listing")
const { verifyToken } = require("../middleware/authentication")
const listingRouter = express.Router()

listingRouter
    .route('/')
    .get(wrapAsync(renderListing))
    .post(verifyToken, wrapAsync(createListing))

listingRouter.get('/searchListing', wrapAsync(searchListing))

listingRouter.get('/mylisting/:userId', wrapAsync(myListing))

listingRouter
    .route('/:listingId')
    .get(wrapAsync(selectedListing))
    .put(wrapAsync(updateListing))
    .delete(wrapAsync(deleteListing))


module.exports = listingRouter