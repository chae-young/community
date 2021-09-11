import { all, fork } from "redux-saga/effects"
import axios from "axios"

import postSaga from "./post"
import userSaga from "./user"
import movieSaga from "./movie"
import { backUrl } from "../config/cofig"

axios.defaults.baseURL = backUrl
axios.defaults.withCredentials = true

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga), fork(movieSaga)])
}
