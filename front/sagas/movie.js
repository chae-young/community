import axios from "axios"
import { fork, all, takeLatest, delay, put, call } from "redux-saga/effects"
import {
  MAIN_MOVIE_REQUEST,
  MAIN_MOVIE_SUCCESS,
  MAIN_MOVIE_FAILURE,
} from "../reducers/movie"

function mainMovieAPI(data) {
  return axios.get("/moive", data)
}

function* mainMovie(action) {
  // const result = yield call(mainMovieAPI)
  // console.log(result)
  yield delay(1000)
  try {
    yield delay(1000)
    yield put({
      type: MAIN_MOVIE_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: MAIN_MOVIE_FAILURE,
      data: err.response.data,
    })
  }
}

function* watchMainMovie() {
  yield takeLatest(MAIN_MOVIE_REQUEST, mainMovie)
}

export default function* postSaga() {
  yield all([fork(watchMainMovie)])
}
