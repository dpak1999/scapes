/** @format */

import nextConnect from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import {
  deleteRoom,
  getSingleRoom,
  updateRoom,
} from '../../../controllers/roomController';
import onError from '../../../middleware/errors';

dbConnect();

const handler = nextConnect({ onError });

handler.get(getSingleRoom);
handler.put(updateRoom);
handler.delete(deleteRoom);

export default handler;
