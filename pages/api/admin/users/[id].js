/** @format */

import nextConnect from 'next-connect';
import dbConnect from '../../../../config/dbConnect';
import {
  getUserDetails,
  updateUserDetails,
} from '../../../../controllers/authController';
import {
  authorizeRoles,
  isAuthentcatedUser,
} from '../../../../middleware/auth';
import onError from '../../../../middleware/errors';

dbConnect();

const handler = nextConnect({ onError });

handler.use(isAuthentcatedUser, authorizeRoles('Admin')).get(getUserDetails);
handler.use(isAuthentcatedUser, authorizeRoles('Admin')).put(updateUserDetails);

export default handler;
