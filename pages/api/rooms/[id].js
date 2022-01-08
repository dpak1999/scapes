/** @format */

import nextConnect from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { getSingleRoom } from '../../../controllers/roomController';
dbConnect();

const handler = nextConnect();

handler.get(getSingleRoom);

export default handler;
