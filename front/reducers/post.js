import produce from "immer"
import shortid from "shortid"

export const initialState = {
  postList: [],
  popularPosts: [],
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
    Image:
      "data:image/webp;base64,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",
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
      default:
        break
    }
  })

export default reducer
