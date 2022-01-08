/** @format */

import catchAsyncErrors from '../middleware/catchAsyncErrors';
import Room from '../models/room';
import ErrorHandler from '../utils/errorHandler';

// CREATE A NEW ROOM
export const newRoom = catchAsyncErrors(async (req, res) => {
  const room = await Room.create(req.body);
  res.status(200).json({
    success: true,
    room,
  });
});

// GET ALL ROOMS
export const getAllRooms = catchAsyncErrors(async (req, res) => {
  const rooms = await Room.find();
  res.status(200).json({
    success: true,
    count: rooms.length,
    rooms,
  });
});

// GET SINGLE ROOM
export const getSingleRoom = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.query.id);
  if (!room) {
    return next(new ErrorHandler('Room with that id does not exist', 404));
  }

  res.status(200).json({
    success: true,
    room,
  });
});

// UPDATE ROOM
export const updateRoom = catchAsyncErrors(async (req, res) => {
  let room = await Room.findById(req.query.id);
  if (!room) {
    return next(new ErrorHandler('Room with that id does not exist', 404));
  }

  room = await Room.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    room,
  });
});

// DELETE ROOM
export const deleteRoom = catchAsyncErrors(async (req, res) => {
  let room = await Room.findById(req.query.id);
  if (!room) {
    return next(new ErrorHandler('Room with that id does not exist', 404));
  }

  await room.remove();

  res.status(200).json({
    success: true,
    message: 'Room deleted successfully',
  });
});
