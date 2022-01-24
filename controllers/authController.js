/** @format */

import User from '../models/user';
import catchAsyncErrors from '../middleware/catchAsyncErrors';

// REGISTER USER
export const registerUser = catchAsyncErrors(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'ID',
      url: 'URL',
    },
  });

  res.status(200).json({
    success: true,
    message: 'Account registered successfully',
  });
});
