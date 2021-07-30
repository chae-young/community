import produce from "immer"
import shortid from "shortid"

export const initialState = {
  postList: [],
  popularPosts: [],
  searchList: [],
  singlePost: null,
  imagePath: "",
  postAddLoading: false,
  postAddDone: false,
  postAddError: null,
  imageUploadLoading: false,
  imageUploadDone: false,
  imageUploadError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  popularPostsLoading: false,
  popularPostsDone: false,
  popularPostsError: null,
  postCount: 0,
  currentPost: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  editCommentLoading: false,
  editCommentDone: false,
  editCommentError: null,
  removeCommentLoading: false,
  removeCommentDone: false,
  removeCommentError: null,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  reviewSearchLoading: false,
  reviewSearchDone: false,
  reviewSearchError: null,
}

export const dummyList = (num) =>
  Array.from(Array(num).keys()).map((v) => ({
    id: 1,
    User: {
      id: 1,
      image: "",
      nickname: "cy",
    },
    title: "제목",
    rating: 4.5,
    content: "첫번째게시글",
    Images: [{ src: "https://" }],
    Comments: [
      {
        User: { nickname: "cy" },
        content: "goob!",
      },
    ],
  }))

//initialState.postList = dummyList(5)
const dummyComment = (data) => ({
  User: { nickname: "cy" },
  content: data.text,
})
const dummyPost = (data) => ({
  id: data.id,
  User: {
    id: shortid.generate(),
    nickname: "테스트용닉네임",
  },
  post: {
    title: data.title,
    rating: data.rating,
    content: data.content,
  },
  Image: data.imagePath,
  Comments: [],
})

export const ADD_POST_REQUEST = "ADD_POST_REQUEST"
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS"
export const ADD_POST_FAILURE = "ADD_POST_FAILURE"

export const IMAGE_UPLOAD_REQUEST = "IMAGE_UPLOAD_REQUEST"
export const IMAGE_UPLOAD_SUCCESS = "IMAGE_UPLOAD_SUCCESS"
export const IMAGE_UPLOAD_FAILURE = "IMAGE_UPLOAD_FAILURE"

export const SRH_IMAGE_UPLOAD = "SRH_IMAGE_UPLOAD"

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST"
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS"
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE"

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST"
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS"
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE"

export const POPULAR_POSTS_REQUEST = "POPULAR_POSTS_REQUEST"
export const POPULAR_POSTS_SUCCESS = "POPULAR_POSTS_SUCCESS"
export const POPULAR_POSTS_FAILURE = "POPULAR_POSTS_FAILURE"

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST"
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS"
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE"

export const EDIT_COMMENT_REQUEST = "EDIT_COMMENT_REQUEST"
export const EDIT_COMMENT_SUCCESS = "EDIT_COMMENT_SUCCESS"
export const EDIT_COMMENT_FAILURE = "EDIT_COMMENT_FAILURE"

export const REMOVE_COMMENT_REQUEST = "REMOVE_COMMENT_REQUEST"
export const REMOVE_COMMENT_SUCCESS = "REMOVE_COMMENT_SUCCESS"
export const REMOVE_COMMENT_FAILURE = "REMOVE_COMMENT_FAILURE"

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST"
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS"
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE"

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST"
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS"
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE"

export const REVIEW_SEARCH_REQUEST = "REVIEW_SEARCH_REQUEST"
export const REVIEW_SEARCH_SUCCESS = "REVIEW_SEARCH_SUCCESS"
export const REVIEW_SEARCH_FAILURE = "REVIEW_SEARCH_FAILURE"

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.postAddLoading = true
        draft.postAddDone = false
        break
      case ADD_POST_SUCCESS:
        draft.postAddLoading = false
        draft.postAddDone = true
        draft.postList.unshift(action.data)
        break
      case ADD_POST_FAILURE:
        draft.postAddDone = false
        draft.postAddError = action.error
        break
      case IMAGE_UPLOAD_REQUEST:
        draft.imageUploadLoading = true
        draft.imageUploadDone = false
        draft.imagePath = ""
        break
      case IMAGE_UPLOAD_SUCCESS:
        draft.imageUploadLoading = false
        draft.imageUploadDone = true
        draft.imagePath = action.data
        break
      case IMAGE_UPLOAD_FAILURE:
        draft.imageUploadDone = false
        draft.imageUploadError = action.error
        break
      case SRH_IMAGE_UPLOAD:
        draft.imagePath = action.data
        break
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true
        draft.loadPostsDone = false
        break
      case LOAD_POSTS_SUCCESS: {
        draft.loadPostsLoading = false
        const posts = [...action.data, ...draft.postList]
        draft.postList = posts
        draft.postCount = action.data.length
        draft.loadPostsDone = true
        break
      }
      case LOAD_POSTS_FAILURE:
        draft.loadPostsDone = false
        draft.loadPostsError = action.error
        break
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true
        draft.loadPostDone = false
        break
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false
        draft.singlePost = action.data
        draft.loadPostDone = true
        break
      case LOAD_POST_FAILURE:
        draft.loadPostDone = false
        draft.loadPostError = action.error
        break
      case POPULAR_POSTS_REQUEST:
        draft.popularPostsLoading = true
        draft.popularPostsDone = false
        break
      case POPULAR_POSTS_SUCCESS: {
        draft.popularPostsLoading = false
        draft.popularPosts = draft.popularPosts.concat(action.data)
        draft.popularPostsDone = true
        break
      }
      case POPULAR_POSTS_FAILURE:
        draft.popularPostsDone = false
        draft.popularPostsError = action.error
        break
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true
        draft.addCommentDone = false
        break
      case ADD_COMMENT_SUCCESS: {
        const post = draft.postList.find((v) => v.id === action.data.PostId)
        draft.singlePost.Comments.unshift(action.data)
        draft.addCommentLoading = false
        draft.addCommentDone = true
        break
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentDone = false
        draft.addCommentError = action.error
        break
      case EDIT_COMMENT_REQUEST:
        draft.editCommentLoading = true
        draft.editCommentDone = false
        break
      case EDIT_COMMENT_SUCCESS: {
        const post = draft.postList.find((v) => v.id === action.data.PostId)
        const comment = draft.singlePost.Comments.find(
          (v) => v.id === action.data.CommentId,
        )
        comment.content = action.data.content
        //comment.content = action.data.content
        draft.editCommentLoading = false
        draft.editCommentDone = true
        break
      }
      case EDIT_COMMENT_FAILURE:
        draft.editCommentDone = false
        draft.editCommentError = action.error
        break
      case REMOVE_COMMENT_REQUEST: {
        // const postIndex = draft.postList.findIndex(
        //   (v) => v.id === action.data.postId,
        // )
        // draft.currentPost = postIndex
        draft.removeCommentLoading = true
        draft.removeCommentDone = false
        break
      }
      case REMOVE_COMMENT_SUCCESS: {
        const post = draft.postList[draft.currentPost]
        draft.singlePost.Comments = draft.singlePost.Comments.filter(
          (v) => v.id !== action.data.CommentId,
        )
        draft.removeCommentLoading = false
        draft.removeCommentDone = true
        break
      }
      case REMOVE_COMMENT_FAILURE:
        draft.removeCommentDone = false
        draft.removeCommentError = action.error
        break
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true
        draft.likePostDone = false
        break
      case LIKE_POST_SUCCESS: {
        draft.likePostLoading = false
        draft.likePostDone = true
        //const post = draft.postList.find((v) => v.id === action.data.PostId)
        //post.Likers.unshift({ id: action.data.UserId })
        draft.singlePost.Likers.unshift({ id: action.data.UserId })
        break
      }
      case LIKE_POST_FAILURE:
        draft.likePostDone = false
        draft.likePostError = action.error
        break
      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true
        draft.unlikePostDone = false
        break
      case UNLIKE_POST_SUCCESS: {
        draft.unlikePostLoading = false
        draft.unlikePostDone = true
        //const post = draft.postList.find((v) => v.id === action.data.PostId)
        //post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId)
        draft.singlePost.Likers = draft.singlePost.Likers.filter(
          (v) => v.id !== action.data.UserId,
        )
        break
      }
      case UNLIKE_POST_FAILURE:
        draft.unlikePostDone = false
        draft.unlikePostError = action.error
        break
      case REVIEW_SEARCH_REQUEST:
        draft.reviewSearchLoading = true
        draft.reviewSearchDone = false
        break
      case REVIEW_SEARCH_SUCCESS:
        draft.reviewSearchLoading = false
        draft.reviewSearchDone = true
        draft.searchList = draft.searchList.concat(action.data)
        break
      case REVIEW_SEARCH_FAILURE:
        draft.reviewSearchDone = false
        draft.reviewSearchError = action.error
        break
      default:
        break
    }
  })

export default reducer
