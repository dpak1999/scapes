/** @format */

import nextConnect from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { getAllRooms, newRoom } from '../../../controllers/roomController';
dbConnect();

const handler = nextConnect();

handler.get(getAllRooms);
handler.post(newRoom);

export default handler;
