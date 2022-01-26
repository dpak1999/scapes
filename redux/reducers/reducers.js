/** @format */

import { combineReducers } from 'redux';
import { checkBookingReducer } from './bookingReducers';
import { allRoomsReducer, roomDetailsReducer } from './roomReducers';
import { authReducer, forgotPasswordReducer, userReducer } from './userReducer';

const reducers = combineReducers({
  allRooms: allRoomsReducer,
  roomDetail: roomDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  checkBooking: checkBookingReducer,
});

export default reducers;
