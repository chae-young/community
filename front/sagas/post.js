import axios from "axios"
import { fork, all, takeLatest, delay, put, call } from "redux-saga/effects"
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAILURE,
} from "../reducers/post"

function addPostAPI(data) {
  return axios.post("/post/", data)
}
function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data)
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    })
  }
}

function imageUploadAPI(data) {
  return axios.post("/post/image", data)
}
function* imageUpload(action) {
  try {
    const result = yield call(imageUploadAPI, action.data)
    //yield delay(1000)
    yield put({
      type: IMAGE_UPLOAD_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: IMAGE_UPLOAD_FAILURE,
      error: err.response.data,
    })
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost)
}
function* watchImageUpload() {
  yield takeLatest(IMAGE_UPLOAD_REQUEST, imageUpload)
}

export default function* postSaga() {
  yield all(
    [
      fork(watchAddPost),
      fork(watchImageUpload),
    ]
  )
}
