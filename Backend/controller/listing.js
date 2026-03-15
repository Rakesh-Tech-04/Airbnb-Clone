import  mongoose  from "mongoose"
import Listing from "../models/listing.js"
import Review from "../models/review.js"
import { uploadInCloudinary, cloudinary } from "../utils/cloudinary.js"
import ExpressError from '../utils/ExpressError.js'
import { listingSchema } from "../utils/joi.js"

export const renderListing = async (req, res) => {
    let lastId = req.query.lastId
    let p = req.query.p
    let query = {}
    if (lastId) {
        query._id = { $lt: new mongoose.Types.ObjectId(lastId) }
    }
    if (p) {
        if (p === 'Trending') {
            query = {}
        }
        else {
            query.describe = p
        }

    }

    let allListing = await Listing.find(query).sort({ _id: -1 }).limit(12)
    // let hasMore = allListing.length > 12
    // if (hasMore) {
    //     allListing.pop()
    // }
    // console.log(allListing)
    res.status(200).json({ allListing })
}

export const selectedListing = async (req, res) => {
    let { listingId } = req.params
    let listing = await Listing.findById(listingId)
    res.status(200).json(listing)
}

export const createListing = async (req, res, next) => {
    let data = JSON.parse(req.body.data)
    let image = await Promise.all((req.files).map((file) => uploadInCloudinary(file)))
    data = { ...data, image }
    let { error } = listingSchema.validate(data, {
        abortEarly: false,
        allowUnknown: false
    })
    if (error) {
        for (const img of image) {
            if (img.publicId) {
                await cloudinary.uploader.destroy(img.publicId, { resource_type: "image" })
            }
        }
        let errmsg = error.details.map((el) => el.message).join(', ');
        return next(new ExpressError(400, errmsg))
    }
    let newListing = new Listing(data)
    newListing.user = req.user.id
    newListing.image = image
    await newListing.save()
    res.status(201).json({ success: true, message: 'Listing is created' })
}

export const updateListing = async (req, res, next) => {
    let { listingId } = req.params
    let data = JSON.parse(req.body.data)
    let replacementIndex = JSON.parse(req.body.replacementIndex)
    for (let i = 0; i < replacementIndex.length; i++) {
        let index = replacementIndex[i]
        await cloudinary.uploader.destroy(data.image[index].publicId, s)
        let image = await uploadInCloudinary(req.files[i])
        data.image[index] = image
    }
    let { error } = listingSchema.validate(data, {
        abortEarly: false,
        allowUnknown: false
    })
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(', ');
        return next(new ExpressError(400, errmsg))
    }
    let listing = await Listing.findByIdAndUpdate(listingId, data, { new: true })
    res.status(201).json(listing)
}

export const deleteListing = async (req, res) => {
    let { listingId } = req.params
    await Review.deleteMany({ listing: listingId })
    let listing = await Listing.findByIdAndDelete(listingId)
    for (const img of listing.image) {
        if (img.publicId) {
            await cloudinary.uploader.destroy(img.publicId, { resource_type: "image" })
        }

    }
    res.status(200).json(listing)
}

export const searchListing = async (req, res) => {
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
            ]
        })
        res.json(listing)
    }
}

export const myListing = async (req, res) => {
    let lastId = req.query.lastId
    let query = { user: req.user.id }

    if (lastId) {
        query._id = { $lt: new mongoose.Types.ObjectId(lastId) }
    }

    let allListing = await Listing.find(query).sort({ _id: -1 }).limit(13)

    let hasMore = allListing.length > 12
    if (hasMore) {
        allListing.pop()
    }
    res.status(200).json({ hasMore, allListing })
}