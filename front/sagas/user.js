import axios from "axios"
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
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

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login)
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
    ]);
}
