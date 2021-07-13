import axios from "axios"
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects"
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  PROFILE_IMG_REQUEST,
  PROFILE_IMG_SUCCESS,
  PROFILE_IMG_FAILURE,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  PROFILE_EDIT_REQUEST,
  PROFILE_EDIT_SUCCESS,
  PROFILE_EDIT_FAILURE,
} from "../reducers/user"

function loadUserAPI() {
  return axios.get("/user")
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data)
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: LOAD_USER_FAILURE,
      error: err.response.data,
    })
  }
}

function loginAPI(data) {
  return axios.post("/user/login", data)
}
function* login(action) {
  try {
    const result = yield call(loginAPI, action.data)
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    })
  }
}

function signUpAPI(data) {
  //return axios.post("/user", data)
}
function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data)
    //yield delay(1000)
    yield put({
      type: SIGN_UP_SUCCESS,
      //data: action.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    })
  }
}

function profileImgAPI(data) {
  return axios.post("/user/image", data)
}
function* profileImg(action) {
  try {
    const result = yield call(profileImgAPI, action.data)
    //yield delay(1000)
    yield put({
      type: PROFILE_IMG_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: PROFILE_IMG_FAILURE,
      error: err.response.data,
    })
  }
}

function profileEditAPI(data) {
  return axios.patch("/user/profile", data)
}
function* profileEdit(action) {
  try {
    const result = yield call(profileEditAPI, action.data)
    yield put({
      type: PROFILE_EDIT_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: PROFILE_EDIT_FAILURE,
      error: err.response.data,
    })
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser)
}
function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login)
}
function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, signUp)
}
function* watchProfileImg() {
  yield takeLatest(PROFILE_IMG_REQUEST, profileImg)
}
function* watchProfileEdit() {
  yield takeLatest(PROFILE_EDIT_REQUEST, profileEdit)
}
export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchSignup),
    fork(watchLoadUser),
    fork(watchProfileImg),
    fork(watchProfileEdit),
  ])
}
