import {
  CLEAR_ERRORS,
  SET_USER,
  SET_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
} from '../types'

import axios from 'axios'

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI })
  axios
    .post('/login', userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token)
      dispatch(getUserData())
      dispatch({ type: CLEAR_ERRORS })
      history.push('/')
    })
    .catch((ex) => {
      dispatch({
        type: SET_ERRORS,
        payload: ex.response.data,
      })
    })
}

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI })
  axios
    .post('/signup', newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token)
      dispatch(getUserData())
      dispatch({ type: CLEAR_ERRORS })
      history.push('/')
    })
    .catch((ex) => {
      dispatch({
        type: SET_ERRORS,
        payload: ex.response.data,
      })
    })
}

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIDToken')
  delete axios.defaults.headers.common['Authorization']
  dispatch({ type: SET_UNAUTHENTICATED })
}

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER })
  axios
    .get('/user')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      })
    })
    .catch((ex) => console.log(ex))
}

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER })
  axios
    .post('user/image', formData)
    .then(() => {
      dispatch(getUserData())
    })
    .catch((ex) => console.log(ex))
}

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER })
  axios
    .post('/user', userDetails)
    .then(() => {
      dispatch(getUserData())
    })
    .catch((ex) => console.log(ex))
}

export const markNotificationsRead = (notificationsIds) => (dispatch) => {
  axios
    .post('/notifications', notificationsIds)
    .then((res) => {
      dispatch({ type: MARK_NOTIFICATIONS_READ })
    })
    .catch((ex) => console.log(ex))
}

const setAuthorizationHeader = (token) => {
  const FBIDToken = `Bearer ${token}`
  localStorage.setItem('FBIDToken', FBIDToken)
  axios.defaults.headers.common['Authorization'] = FBIDToken
}
