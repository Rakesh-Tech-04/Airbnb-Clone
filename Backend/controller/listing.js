const cloudinary = require("../middleware/cloudinary")
const Listing = require("../models/listing")

module.exports.renderListing = async (req, res) => {
    let allListing = await Listing.find({})
    res.status(200).json(allListing)
}

module.exports.selectedListing = async (req, res) => {
    let { listingId } = req.params
    let listing = await Listing.findById(listingId)
    res.status(200).json(listing)
}

module.exports.createListing = async (req, res) => {
    let newListing = new Listing(req.body)
    await newListing.save()
    res.status(201).json(newListing)
}

module.exports.updateListing = async (req, res) => {
    let { listingId } = req.params
    let oldListing = await Listing.findById(listingId)
    let listing = await Listing.findByIdAndUpdate(listingId, req.body, { new: true })
    let newIds = new Set((listing.image).map(img => img.publicId))
    for (const img of oldListing.image) {
        if (!newIds.has(img.publicId)) {
            await cloudinary.uploader.destroy(img.publicId)
        }
    }
    res.status(201).json(listing)
}

module.exports.deleteListing = async (req, res) => {
    let { listingId } = req.params
    let listing = await Listing.findByIdAndDelete(listingId)
    for (const img of listing.image) {
        if (img.publicId) {
            await cloudinary.uploader.destroy(img.publicId)
        }
    }
    res.status(200).json(listing)
}

module.exports.searchListing = async (req, res) => {
    const { search } = req.query
    if (search === 'Trending') {
        let listing = await Listing.find({})
        res.json(listing)
    }
    else {
        let listing = await Listing.find({
            $or: [
                { city: { $regex: search, $options: 'i' } },
                { landmark: { $regex: search, $options: 'i' } },
                { describe: { $regex: search, $options: 'i' } },
            ]
        })
        res.json(listing)
    }
}

module.exports.myListing = async (req, res) => {
    let { userId } = req.params
    let MyListing = await Listing.find({ user: userId })
    res.json(MyListing)
}