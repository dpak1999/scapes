/** @format */

import nextConnect from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { getSingleRoom, updateRoom } from '../../../controllers/roomController';
dbConnect();

const handler = nextConnect();

handler.get(getSingleRoom);
handler.put(updateRoom);

export default handler;
