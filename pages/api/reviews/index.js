/** @format */

import nextConnect from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import {
  createRoomReview,
  getRoomReviews,
} from '../../../controllers/roomController';
import { isAuthentcatedUser, authorizeRoles } from '../../../middleware/auth';
import onError from '../../../middleware/errors';

dbConnect();

const handler = nextConnect({ onError });

handler.use(isAuthentcatedUser).put(createRoomReview);
handler.use(isAuthentcatedUser, authorizeRoles('Admin')).get(getRoomReviews);

export default handler;
