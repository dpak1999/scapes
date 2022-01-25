/** @format */

module.exports = {
  env: {
    DB_URI: process.env.DB_URI,
    API_URI: process.env.API_URI,

    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};
