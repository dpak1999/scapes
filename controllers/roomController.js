/** @format */

import catchAsyncErrors from '../middleware/catchAsyncErrors';
import Room from '../models/room';
import APIFeatures from '../utils/apiFeatures';
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
  const resultsPerPage = 4;
  const roomCount = await Room.countDocuments();

  const apiFeatures = new APIFeatures(Room.find(), req.query).search().filter();

  let rooms = await apiFeatures.query;
  let filteredRoomsCount = rooms.length;

  apiFeatures.pagination(resultsPerPage);
  rooms = await apiFeatures.query;

  res.status(200).json({
    success: true,
    roomCount,
    resultsPerPage,
    filteredRoomsCount,
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

// ADD REVIEW
export const createRoomReview = catchAsyncErrors(async (req, res) => {
  const { rating, comment, roomId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const room = await Room.findById(roomId);
  const isReviewed = room.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    room.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    room.reviews.push(review);
    room.numOfReviews = room.reviews.length;
  }
  room.ratings =
    room.reviews.reduce((acc, item) => item.rating + acc, 0) /
    room.reviews.length;

  await room.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
