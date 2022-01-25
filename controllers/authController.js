/** @format */

import cloudinary from 'cloudinary';
import User from '../models/user';
import catchAsyncErrors from '../middleware/catchAsyncErrors';

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// REGISTER USER
export const registerUser = catchAsyncErrors(async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'scapes/avatars',
    width: '150',
    crop: 'scale',
  });

  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: 'Account registered successfully',
  });
});

// GET USER PROFILE
export const currentUserProfile = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

// UPDATE USER PROFILE
export const updateProfile = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
  }

  if (req.body.avatar !== '') {
    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'scapes/avatars',
      width: '150',
      crop: 'scale',
    });

    user.avatar = { public_id: result.public_id, url: result.secure_url };
  }

  await user.save();

  res.status(200).json({
    success: true,
  });
});
