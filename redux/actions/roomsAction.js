/** @format */

import axios from 'axios';
import absoluteUrl from 'next-absolute-url';
import {
  ALL_ROOMS_FAIL,
  ALL_ROOMS_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/roomConstants';

export const getRooms = (req) => async (dispatch) => {
  try {
    // const { origin } = absoluteUrl(req);
    // console.log(origin);
    const { data } = await axios.get(`${process.env.API_URI}/rooms`);

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

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
