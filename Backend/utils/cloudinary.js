const cloudinary = require("cloudinary").v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const uploadInCloudinary = async (file) => {
    try {
        if (!file) return null
        let result = await new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (err, res) => {
                if (err) reject(err)
                resolve(res)
            })
            stream.end(file.buffer)
        })
        let img = { url: result.url, publicId: result.public_id }
        return img
    }
    catch (error) {
        console.log(error)
        throw new Error("Cloudinary upload failed");
    }
}


module.exports = { uploadInCloudinary, cloudinary }