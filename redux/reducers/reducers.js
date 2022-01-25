/** @format */

import { combineReducers } from 'redux';
import { allRoomsReducer, roomDetailsReducer } from './roomReducers';
import { authReducer } from './userReducer';

const reducers = combineReducers({
  allRooms: allRoomsReducer,
  roomDetail: roomDetailsReducer,
  auth: authReducer,
});

export default reducers;
