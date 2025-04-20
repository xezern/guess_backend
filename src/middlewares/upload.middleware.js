const { v2: cloudinary } = require('cloudinary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'drt9t2yvx',
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRET,
});

// Upload middleware
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'upload', 
        format: async (req, file) => 'webp', 
        public_id: (req, file) => `${Date.now()}-${file.originalname.split('.')[0]}`
    },
});

const upload = multer({ storage });

// Delete funksiyası
const deleteImage = async (req, res) => {
    const { filename } = req.params;

    if (!filename || typeof filename !== 'string') {
        return res.status(400).json({ error: "Filename must be provided as a string." });
    }

    try {
        await cloudinary.uploader.destroy(filename); 

        console.log(`Successfully deleted image: ${filename}`);
        res.status(200).json({ message: `Successfully deleted image: ${filename}` });
    } catch (error) {
        console.error("Error deleting image:", error.message || error);
        res.status(500).json({ error: `Failed to delete image: ${error.message}` });
    }
};

module.exports = { upload, deleteImage };
