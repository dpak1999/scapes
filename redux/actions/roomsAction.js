/** @format */

import axios from 'axios';
import {
  ALL_ROOMS_FAIL,
  ALL_ROOMS_SUCCESS,
  CLEAR_ERRORS,
  ROOM_DETAILS_FAIL,
  ROOM_DETAILS_SUCCESS,
} from '../constants/roomConstants';

export const getRooms =
  (currentPage = 1) =>
  async (dispatch) => {
    // console.log('currentPage', currentPage);
    try {
      const { data } = await axios.get(
        `${process.env.API_URI}/rooms?page=${currentPage}`
      );

      dispatch({
        type: ALL_ROOMS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ROOMS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getRoomDetails = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${process.env.API_URI}/rooms/${id}`);
    dispatch({
      type: ROOM_DETAILS_SUCCESS,
      payload: data.room,
    });
  } catch (error) {
    dispatch({
      type: ROOM_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
