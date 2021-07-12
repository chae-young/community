import { all, fork } from "redux-saga/effects"
import axios from "axios"

import postSaga from "./post"
import userSaga from "./user"
import movieSaga from "./movie"

axios.defaults.baseURL = "http://localhost:3063"
axios.defaults.withCredentials = true

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga), fork(movieSaga)])
}
