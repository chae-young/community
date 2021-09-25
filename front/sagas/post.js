import axios from "axios"
import { fork, all, takeLatest, put, call } from "redux-saga/effects"
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
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
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  REVIEW_SEARCH_REQUEST,
  REVIEW_SEARCH_SUCCESS,
  REVIEW_SEARCH_FAILURE,
  USER_POSTS_REQUEST,
  EDIT_POST_FAILURE,
  EDIT_POST_SUCCESS,
  EDIT_POST_REQUEST,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  DRAMA_POSTS_REQUEST,
  DRAMA_POSTS_SUCCESS,
  DRAMA_POSTS_FAILURE,
} from "../reducers/post"

function addPostAPI(data) {
  return axios.post("/post", data)
}
function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data)
    // yield delay(1000)
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

function editPostAPI(editData) {
  return axios.patch(`/post/${editData.postId}`, editData)
}
function* editPost(action) {
  try {
    const result = yield call(editPostAPI, action.editData)
    // yield delay(1000)
    yield put({
      type: EDIT_POST_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: EDIT_POST_FAILURE,
      error: err.response.data,
    })
  }
}

function removePostAPI(data) {
  return axios.delete(`/post/${data}`)
}
function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data)
    // yield delay(1000)
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: REMOVE_POST_FAILURE,
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
    // yield delay(1000)
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

function loadPostsAPI(lastId) {
  return axios.get(`/posts?lastId=${lastId}`)
}
function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.lastId)
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    })
  }
}

function loadPostAPI(data) {
  return axios.get(`/post/${data}`)
}
function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data)
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

function userPostsAPI(data, lastId) {
  return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`)
}
function* userPosts(action) {
  try {
    const result = yield call(userPostsAPI, action.data, action.lastId)
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    })
  }
}

function popularPostsAPI(data) {
  return axios.get(`/posts/popular?limit=${data}`)
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

function dramaPostsAPI(data) {
  return axios.get(`/posts/drama?limit=${data}`)
}
function* dramaPosts(action) {
  try {
    const result = yield call(dramaPostsAPI, action.data)
    yield put({
      type: DRAMA_POSTS_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: DRAMA_POSTS_FAILURE,
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
    // yield delay(1000)
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
    // yield delay(1000)
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
  return axios.remove(`/post/${data.postId}/like`, data)
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

function reviewSearchAPI(data) {
  return axios.get(encodeURI(`/posts/search/${data}`))
}
function* reviewSearch(action) {
  try {
    const result = yield call(reviewSearchAPI, action.data)
    // yield delay(1000)
    yield put({
      type: REVIEW_SEARCH_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: REVIEW_SEARCH_FAILURE,
      error: err.response.data,
    })
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost)
}
function* watchEditPost() {
  yield takeLatest(EDIT_POST_REQUEST, editPost)
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost)
}
function* watchImageUpload() {
  yield takeLatest(IMAGE_UPLOAD_REQUEST, imageUpload)
}
function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts)
}
function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost)
}
function* watchUserPosts() {
  yield takeLatest(USER_POSTS_REQUEST, userPosts)
}
function* watchPopularPosts() {
  yield takeLatest(POPULAR_POSTS_REQUEST, popularPosts)
}
function* watchDramaPosts() {
  yield takeLatest(DRAMA_POSTS_REQUEST, dramaPosts)
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
function* watchReviewSearch() {
  yield takeLatest(REVIEW_SEARCH_REQUEST, reviewSearch)
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchEditPost),
    fork(watchRemovePost),
    fork(watchImageUpload),
    fork(watchLoadPosts),
    fork(watchLoadPost),
    fork(watchUserPosts),
    fork(watchPopularPosts),
    fork(watchDramaPosts),
    fork(watchAddComment),
    fork(watchEditComment),
    fork(watchRemoveComment),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchReviewSearch),
  ])
}
