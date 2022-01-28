/** @format */

import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from './catchAsyncErrors';
import { getSession } from 'next-auth/client';

export const isAuthentcatedUser = catchAsyncErrors(async (req, res, next) => {
  const session = await getSession({ req });

  if (!session) {
    return next(new ErrorHandler('You are not logged in', 401));
  }

  req.user = session.user;
  next();
});
