/** @format */

import nextConnect from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { getAllRooms, newRoom } from '../../../controllers/roomController';
import onError from '../../../middleware/errors';

dbConnect();

const handler = nextConnect({ onError });

handler.get(getAllRooms);
handler.post(newRoom);

export default handler;
