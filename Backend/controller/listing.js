const Listing = require("../models/listing")
const { uploadInCloudinary, cloudinary } = require("../utils/cloudinary")

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
    let data = JSON.parse(req.body.data)
    console.log('body', data)
    console.log(req.files)

    let image = await Promise.all((req.files).map((file) => uploadInCloudinary(file)))
    let newListing = new Listing(data)
    newListing.user = req.user.id
    newListing.image = image
    await newListing.save()
    res.status(201).json(newListing)
}

module.exports.updateListing = async (req, res) => {
    let { listingId } = req.params
    let data = JSON.parse(req.body.data)
    let replacementIndex = JSON.parse(req.body.replacementIndex)
    for (let i = 0; i < replacementIndex.length; i++) {
        let index = replacementIndex[i]
        await cloudinary.uploader.destroy(data.image[index].publicId, { resource_type: "image" })
        let image = await uploadInCloudinary(req.files[i])
        data.image[index] = image
    }
    let listing = await Listing.findByIdAndUpdate(listingId, data, { new: true })
    res.status(201).json(listing)
}

module.exports.deleteListing = async (req, res) => {
    let { listingId } = req.params
    let listing = await Listing.findByIdAndDelete(listingId)
    for (const img of listing.image) {
        if (img.publicId) {
            await cloudinary.uploader.destroy(img.publicId, { resource_type: "image" })
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