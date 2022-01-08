/** @format */

import nextConnect from 'next-connect';
import { getAllRooms } from '../../../controllers/roomController';

const handler = nextConnect();

handler.get(getAllRooms);

export default handler;
