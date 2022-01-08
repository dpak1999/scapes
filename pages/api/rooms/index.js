/** @format */

import nextConnect from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { getAllRooms } from '../../../controllers/roomController';
dbConnect();

const handler = nextConnect();

handler.get(getAllRooms);

export default handler;
