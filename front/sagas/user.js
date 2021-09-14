import axios from "axios"
import {
  all,
  call,
  delay,
  throttle,
  fork,
  put,
  takeLatest,
} from "redux-saga/effects"
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
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAILURE,
  PROFILE_EDIT_REQUEST,
  PROFILE_EDIT_SUCCESS,
  PROFILE_EDIT_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOWING_REQUEST,
  FOLLOWING_SUCCESS,
  FOLLOWING_FAILURE,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  FOLLOW_LIST_REQUEST,
  FOLLOW_LIST_SUCCESS,
  FOLLOW_LIST_FAILURE,
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

function userInfoAPI(data) {
  return axios.get(`/user/${data}`)
}
function* userInfo(action) {
  try {
    const result = yield call(userInfoAPI, action.data)
    yield put({
      type: USER_INFO_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: USER_INFO_FAILURE,
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

function logOutAPI() {
  return axios.post("/user/logout")
}

function* logOut() {
  try {
    yield call(logOutAPI)
    yield put({
      type: LOG_OUT_SUCCESS,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    })
  }
}

function signUpAPI(data) {
  return axios.post("/user", data)
}
function* signUp(action) {
  try {
    yield call(signUpAPI, action.data)
    yield put({
      type: SIGN_UP_SUCCESS,
      // data: result.data,
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
    // yield delay(1000)
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

function followAPI(data) {
  return axios.patch(`/user/${data}/follow`)
}
function* follow(action) {
  try {
    const result = yield call(followAPI, action.data)

    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    })
  }
}

function followingAPI(data) {
  return axios.delete(`/user/${data}/follow`)
}
function* following(action) {
  try {
    const result = yield call(followingAPI, action.data)

    yield put({
      type: FOLLOWING_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: FOLLOWING_FAILURE,
      error: err.response.data,
    })
  }
}

function followListAPI(data) {
  return axios.get(`/user/${data.userId}/${data.name}?limit=${data.limit}`)
}
function* followList(action) {
  try {
    const result = yield call(followListAPI, action.data)
    yield delay(1000)
    yield put({
      type: FOLLOW_LIST_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: FOLLOW_LIST_FAILURE,
      error: err.response.data,
    })
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser)
}
function* watchUserInfo() {
  yield takeLatest(USER_INFO_REQUEST, userInfo)
}
function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login)
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut)
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
function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow)
}
function* watchFollowing() {
  yield takeLatest(FOLLOWING_REQUEST, following)
}
function* watchFollowList() {
  yield throttle(1000, FOLLOW_LIST_REQUEST, followList)
}
export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchSignup),
    fork(watchLoadUser),
    fork(watchUserInfo),
    fork(watchProfileImg),
    fork(watchProfileEdit),
    fork(watchFollow),
    fork(watchFollowing),
    fork(watchFollowList),
  ])
}
