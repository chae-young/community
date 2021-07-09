import axios from "axios"
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects"
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from "../reducers/user"

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

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login)
}
function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, signUp)
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchSignup)])
}
