/** @format */

import Room from '../models/room';
import ErrorHandler from '../utils/errorHandler';

// CREATE A NEW ROOM
export const newRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL ROOMS
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({
      success: true,
      count: rooms.length,
      rooms,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE ROOM
export const getSingleRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.query.id);
    if (!room) {
      return next(new ErrorHandler('Room with that id does not exist', 404));
    }

    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE ROOM
export const updateRoom = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE ROOM
export const deleteRoom = async (req, res) => {
  try {
    let room = await Room.findById(req.query.id);
    if (!room) {
      return next(new ErrorHandler('Room with that id does not exist', 404));
    }

    await room.remove();

    res.status(200).json({
      success: true,
      message: 'Room deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
