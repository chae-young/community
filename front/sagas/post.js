import axios from "axios"
import shortid from "shortid"
import {
  fork,
  all,
  takeLatest,
  throttle,
  takeLeading,
  delay,
  put,
  call,
} from "redux-saga/effects"
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  dummyList,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  POPULAR_POSTS_REQUEST,
  POPULAR_POSTS_SUCCESS,
  POPULAR_POSTS_FAILURE,
  EDIT_COMMENT_REQUEST,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
  REMOVE_COMMENT_REQUEST,
} from "../reducers/post"

function addPostAPI(data) {
  return axios.post("/post", data)
}
function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data)
    //yield delay(1000)
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

function loadPostAPI(lastId) {
  return axios.get(`/posts?lastId=${lastId}`)
}
function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.lastId)
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    })
  }
}

function popularPostsAPI() {
  return axios.get("/posts/popular")
}
function* popularPosts(action) {
  try {
    const result = yield call(popularPostsAPI, action.data)
    yield put({
      type: POPULAR_POSTS_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: POPULAR_POSTS_FAILURE,
      error: err.response.data,
    })
  }
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data)
}
function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data)
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    })
  }
}

function editCommentAPI(data) {
  return axios.patch(`/post/${data.commentId}/comment`, data)
}
function* editComment(action) {
  try {
    const result = yield call(editCommentAPI, action.data)
    //yield delay(1000)
    yield put({
      type: EDIT_COMMENT_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: EDIT_COMMENT_FAILURE,
      error: err.response.data,
    })
  }
}

function removeCommentAPI(data) {
  return axios.delete(`/post/${data.commentId}/comment`)
}
function* removeComment(action) {
  try {
    const result = yield call(removeCommentAPI, action.data)
    //yield delay(1000)
    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: REMOVE_COMMENT_FAILURE,
      error: err.response.data,
    })
  }
}

function likePostAPI(data) {
  return axios.patch(`/post/${data.postId}/like`, data)
}
function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data)
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    })
  }
}

function unlikePostAPI(data) {
  return axios.delete(`/post/${data.postId}/like`, data)
}
function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data)
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: UNLIKE_POST_FAILURE,
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
function* watchLoadPost() {
  yield throttle(3000, LOAD_POST_REQUEST, loadPost)
}
function* watchPopularPosts() {
  yield throttle(3000, POPULAR_POSTS_REQUEST, popularPosts)
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}
function* watchEditComment() {
  yield takeLatest(EDIT_COMMENT_REQUEST, editComment)
}
function* watchRemoveComment() {
  yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment)
}
function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost)
}
function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost)
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchImageUpload),
    fork(watchLoadPost),
    fork(watchPopularPosts),
    fork(watchAddComment),
    fork(watchEditComment),
    fork(watchRemoveComment),
    fork(watchLikePost),
    fork(watchUnlikePost),
  ])
}
