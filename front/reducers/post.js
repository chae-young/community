import produce from "immer"

export const initialState = {
  postList: [],
  imagePaths: [],
  postAddLoading: false,
  postAddDone: false,
  postAddError: null,
}

const dummyList = (num) =>
  Array.from(Array(num).keys()).map((v) => ({
    id: 1,
    User: {
      id: 1,
      ninckname: "cy",
    },
    post: {
      title: "제목",
      content: "첫번째게시글",
    },
    Images: [
      {
        src: "https://img.hankyung.com/photo/201906/20190605152133_5cf75f6ce454e_1.jpg",
      },
    ],
    Comments: [
      {
        User: { nickname: "cy" },
        content: "goob!",
      },
    ],
  }))

// initialState.postList = dummyList(100)

const dummyPost = (data) => ({
  id: 1,
  User: {
    id: 2,
    nickname: "더미닉넴",
  },
  post: {
    title: data.title,
    rate: data.rating,
    content: data.content,
  },
  Images: data.imgSrc,
  Comments: [],
})

export const ADD_POST_REQUEST = "ADD_POST_REQUEST"
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS"
export const ADD_POST_FAILURE = "ADD_POST_FAILURE"

export const addPostReuestAction = (data) => ({
  type: ADD_POST_REQUEST,
  data,
})

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
        draft.postList.unshift(dummyPost(action.data))
        break
      case ADD_POST_FAILURE:
        draft.postAddDone = false
        draft.postAddError = action.error
        break
      default:
        break
    }
  })

export default reducer
