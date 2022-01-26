/** @format */

import { combineReducers } from 'redux';
import {
  bookedDatesReducer,
  bookingsReducer,
  checkBookingReducer,
} from './bookingReducers';
import { allRoomsReducer, roomDetailsReducer } from './roomReducers';
import { authReducer, forgotPasswordReducer, userReducer } from './userReducer';

const reducers = combineReducers({
  allRooms: allRoomsReducer,
  roomDetail: roomDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingsReducer,
});

export default reducers;
