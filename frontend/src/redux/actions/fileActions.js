import {
  FILE_CREATE_FAIL,
  FILE_CREATE_REQUEST,
  FILE_CREATE_SUCCESS,
  FILE_DELETE_FAIL,
  FILE_DELETE_REQUEST,
  FILE_DELETE_SUCCESS,
  FILE_GET_FAIL,
  FILE_GET_REQUEST,
  FILE_GET_SUCCESS,
} from "../constants/courseFileType"
import axios from "axios"
import { API_URL } from "../../utils/constants"

export const deleteFileCourse = (id) => async (dispatch) => {
  try {
    dispatch({ type: FILE_DELETE_REQUEST })

    await axios.delete(`${API_URL}/file/${id}`)

    dispatch({
      type: FILE_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: FILE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getFiles = () => async (dispatch) => {
  try {
    dispatch({ type: FILE_GET_REQUEST })

    const { data } = await axios.get(`${API_URL}/getAllFiles`)

    dispatch({
      type: FILE_GET_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FILE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const fileGetA = () => async (dispatch) => {
  try {
    dispatch({ type: FILE_GET_REQUEST })

    const { data } = await axios.get(`${API_URL}/getAllFiles`)

    dispatch({
      type: FILE_GET_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FILE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createFile = (formData) => async (dispatch) => {
  try {
    dispatch({ type: FILE_CREATE_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.post(`${API_URL}/upload`, formData, config)

    dispatch({
      type: FILE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FILE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
