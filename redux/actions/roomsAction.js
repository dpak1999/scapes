/** @format */

import axios from 'axios';
import {
  ADMIN_ROOMS_FAIL,
  ADMIN_ROOMS_REQUEST,
  ADMIN_ROOMS_SUCCESS,
  ALL_ROOMS_FAIL,
  ALL_ROOMS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_ROOM_FAIL,
  DELETE_ROOM_REQUEST,
  DELETE_ROOM_SUCCESS,
  GET_REVIEWS_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_ROOM_FAIL,
  NEW_ROOM_REQUEST,
  NEW_ROOM_SUCCESS,
  REVIEW_AVAILABILTY_FAIL,
  REVIEW_AVAILABILTY_REQUEST,
  REVIEW_AVAILABILTY_SUCCESS,
  ROOM_DETAILS_FAIL,
  ROOM_DETAILS_SUCCESS,
  UPDATE_ROOM_FAIL,
  UPDATE_ROOM_REQUEST,
  UPDATE_ROOM_SUCCESS,
} from '../constants/roomConstants';

export const getRooms =
  (currentPage = 1, location = '', guests, category) =>
  async (dispatch) => {
    try {
      let link = `${process.env.API_URI}/rooms?page=${currentPage}&location=${location}`;

      if (guests) link = link.concat(`&guestCapacity=${guests}`);
      if (category) link = link.concat(`&category=${category}`);

      const { data } = await axios.get(link);

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

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `${process.env.API_URI}/reviews`,
      reviewData,
      config
    );

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const checkReview = (roomId) => async (dispatch) => {
  try {
    dispatch({ type: REVIEW_AVAILABILTY_REQUEST });

    const { data } = await axios.get(
      `/api/reviews/check_review_availability?roomId=${roomId}`
    );

    dispatch({
      type: REVIEW_AVAILABILTY_SUCCESS,
      payload: data.isReviewAvailable,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_AVAILABILTY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminRooms = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ROOMS_REQUEST });

    const { data } = await axios.get(`/api/admin/rooms`);

    dispatch({
      type: ADMIN_ROOMS_SUCCESS,
      payload: data.rooms,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ROOMS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newRoom = (roomData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ROOM_REQUEST });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const { data } = await axios.post(`/api/rooms`, roomData, config);

    dispatch({
      type: NEW_ROOM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_ROOM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateRoom = (id, roomData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ROOM_REQUEST });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const { data } = await axios.put(`/api/rooms/${id}`, roomData, config);

    dispatch({
      type: UPDATE_ROOM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ROOM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteRoom = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ROOM_REQUEST });

    const { data } = await axios.delete(`/api/rooms/${id}`);

    dispatch({
      type: DELETE_ROOM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ROOM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getRoomReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEWS_REQUEST });

    const { data } = await axios.get(`/api/reviews/?id=${id}`);

    dispatch({
      type: GET_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: GET_REVIEWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteReview = (id, roomId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/reviews/?id=${id}&roomId=${roomId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
