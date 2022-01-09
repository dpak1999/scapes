/** @format */

import { combineReducers } from 'redux';
import { allRoomsReducer, roomDetailsReducer } from './roomReducers';

const reducers = combineReducers({
  allRooms: allRoomsReducer,
  roomDetail: roomDetailsReducer,
});

export default reducers;
