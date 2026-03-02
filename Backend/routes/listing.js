const express = require("express")
const { wrapAsync } = require("../middleware/wrapAsync")
const { createListing, deleteListing, renderListing, updateListing, selectedListing, searchListing, myListing } = require("../controller/listing")
const { verifyToken } = require("../middleware/authentication")
const upload = require("../middleware/multer")
const listingRouter = express.Router()

listingRouter
    .route('/')
    .get(wrapAsync(renderListing))
    .post(verifyToken, upload.array('images', 3), wrapAsync(createListing))

listingRouter.get('/searchListing', wrapAsync(searchListing))

listingRouter.get('/mylisting/:userId', wrapAsync(myListing))

listingRouter
    .route('/:listingId')
    .get(wrapAsync(selectedListing))
    .put(verifyToken, upload.array('images', 3), wrapAsync(updateListing))
    .delete(verifyToken, wrapAsync(deleteListing))


module.exports = listingRouter