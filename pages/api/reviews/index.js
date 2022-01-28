/** @format */

import nextConnect from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { createRoomReview } from '../../../controllers/roomController';
import { isAuthentcatedUser } from '../../../middleware/auth';
import onError from '../../../middleware/errors';

dbConnect();

const handler = nextConnect({ onError });

handler.use(isAuthentcatedUser).put(createRoomReview);

export default handler;
