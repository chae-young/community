import axios from "axios"
import { fork, all, takeLatest, delay, put, call } from "redux-saga/effects"
import {
  MOVIE_SRH_REQUEST,
  MOVIE_SRH_SUCCESS,
  MOVIE_SRH_FAILURE,
  NOW_SCREENING_MOVIE_REQUEST,
  NOW_SCREENING_MOVIE_SUCCESS,
  NOW_SCREENING_MOVIE_FAILURE,
} from "../reducers/movie"

function movieSrhAPI(data) {
  return axios.get("/movie", {
    params: {
      query: data,
    },
  })
}
function* movieSrh(action) {
  try {
    const result = yield call(movieSrhAPI, action.data)
    console.log(result)

    yield put({
      type: MOVIE_SRH_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: MOVIE_SRH_FAILURE,
      error: err.response.data,
    })
  }
}

function nowScreeningMovieAPI() {
  return axios.get("/movie/main")
}
function* nowScreeningMovie(action) {
  try {
    const result = yield call(nowScreeningMovieAPI, action.data)
    console.log(result)

    yield put({
      type: NOW_SCREENING_MOVIE_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: NOW_SCREENING_MOVIE_FAILURE,
      error: err.response.data,
    })
  }
}

function* watchNowScreeningMovie() {
  yield takeLatest(NOW_SCREENING_MOVIE_REQUEST, nowScreeningMovie)
}
function* watchMovieSrh() {
  yield takeLatest(MOVIE_SRH_REQUEST, movieSrh)
}

export default function* movieSaga() {
  yield all([fork(watchMovieSrh), fork(watchNowScreeningMovie)])
}
