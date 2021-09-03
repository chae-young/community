import produce from "../utill/produce"

export const initialState = {
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,
  userInfoLoading: false,
  userInfoDone: false,
  userInfoError: null,
  loginLoading: false,
  loginDone: false,
  loginError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  profileImgLoading: false,
  profileImgDone: false,
  profileImgError: null,
  profileEditLoading: false,
  profileEditDone: false,
  profileEditError: null,
  followLoading: false,
  followDone: false,
  followError: null,
  followingLoading: false,
  followingDone: false,
  followingError: null,
  followListLoading: false,
  followListDone: false,
  followListError: null,
  me: null,
  userInfo: null,
  followList: [],
}
export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST"
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS"
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE"

export const USER_INFO_REQUEST = "USER_INFO_REQUEST"
export const USER_INFO_SUCCESS = "USER_INFO_SUCCESS"
export const USER_INFO_FAILURE = "USER_INFO_FAILURE"

export const LOG_IN_REQUEST = "LOG_IN_REQUEST"
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS"
export const LOG_IN_FAILURE = "LOG_IN_FAILURE"

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST"
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS"
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE"

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST"
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS"
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE"

export const PROFILE_IMG_REQUEST = "PROFILE_IMG_REQUEST"
export const PROFILE_IMG_SUCCESS = "PROFILE_IMG_SUCCESS"
export const PROFILE_IMG_FAILURE = "PROFILE_IMG_FAILURE"

export const PROFILE_EDIT_REQUEST = "PROFILE_EDIT_REQUEST"
export const PROFILE_EDIT_SUCCESS = "PROFILE_EDIT_SUCCESS"
export const PROFILE_EDIT_FAILURE = "PROFILE_EDIT_FAILURE"

export const FOLLOW_REQUEST = "FOLLOW_REQUEST"
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS"
export const FOLLOW_FAILURE = "FOLLOW_FAILURE"

export const FOLLOWING_REQUEST = "FOLLOWING_REQUEST"
export const FOLLOWING_SUCCESS = "FOLLOWING_SUCCESS"
export const FOLLOWING_FAILURE = "FOLLOWING_FAILURE"

export const FOLLOW_LIST_REQUEST = "FOLLOW_LIST_REQUEST"
export const FOLLOW_LIST_SUCCESS = "FOLLOW_LIST_SUCCESS"
export const FOLLOW_LIST_FAILURE = "FOLLOW_LIST_FAILURE"

export const LoginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  ...data,
})

// dummyFollow(10)
export const dummyFollow = (data) =>
  Array(data)
    .fill()
    .map(() => ({
      id: 2,
      nickname: "채영",
      src: null,
    }))

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_USER_REQUEST:
        draft.loadUserLoading = true
        draft.loadUserError = null
        draft.loadUserDone = false
        break
      case LOAD_USER_SUCCESS:
        draft.loadUserLoading = false
        draft.me = action.data
        draft.loadUserDone = true
        break
      case LOAD_USER_FAILURE:
        draft.loadUserLoading = false
        draft.loadUserError = action.error
        break
      case USER_INFO_REQUEST:
        draft.userInfoLoading = true
        draft.userInfoError = null
        draft.userInfoDone = false
        break
      case USER_INFO_SUCCESS:
        draft.userInfoLoading = false
        draft.userInfo = action.data
        draft.userInfoDone = true
        break
      case USER_INFO_FAILURE:
        draft.userInfoLoading = false
        draft.userInfoError = action.error
        break
      case LOG_IN_REQUEST:
        draft.loginLoading = true
        draft.loginDone = false
        draft.loginError = null
        break
      case LOG_IN_SUCCESS:
        draft.loginLoading = false
        draft.me = action.data
        draft.loginDone = true
        break
      case LOG_IN_FAILURE:
        draft.loginLoading = false
        draft.loginError = action.error
        break
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true
        draft.logOutDone = false
        break
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false
        draft.logOutDone = true
        draft.me = null
        break
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false
        draft.logOutError = action.error
        break
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true
        draft.signUpDone = false
        draft.signUpError = null
        break
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false
        draft.signUpDone = true
        break
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false
        draft.signUpError = action.error
        break
      case PROFILE_IMG_REQUEST:
        draft.profileImgLoading = true
        draft.profileImgDone = false
        draft.profileImgError = null
        break
      case PROFILE_IMG_SUCCESS:
        draft.profileImgLoading = false
        draft.profileImgDone = true
        draft.me.src = action.data
        break
      case PROFILE_IMG_FAILURE:
        draft.profileImgLoading = false
        draft.profileImgError = action.error
        break
      case PROFILE_EDIT_REQUEST:
        draft.profileEditLoading = true
        draft.profileEditDone = false
        draft.profileEditError = null
        break
      case PROFILE_EDIT_SUCCESS:
        draft.profileEditLoading = false
        draft.profileEditDone = true
        draft.me.nickname = action.data.nickname
        draft.me.src = action.data.image
        break
      case PROFILE_EDIT_FAILURE:
        draft.profileEditLoading = false
        draft.profileEditError = action.error
        break
      case FOLLOW_REQUEST:
        draft.followLoading = true
        draft.followDone = false
        draft.followError = null
        break
      case FOLLOW_SUCCESS:
        draft.followLoading = false
        draft.me.Followings.unshift({ id: action.data.UserId })
        draft.followDone = true
        break
      case FOLLOW_FAILURE:
        draft.followLoading = false
        draft.followError = action.error
        break
      case FOLLOWING_REQUEST:
        draft.followingLoading = true
        draft.followingDone = false
        draft.followingError = null
        break
      case FOLLOWING_SUCCESS:
        draft.followingLoading = false
        draft.me.Followings = draft.me.Followings.filter(
          (v) => v.id !== action.data.UserId,
        )
        draft.followingDone = true
        break
      case FOLLOWING_FAILURE:
        draft.followingLoading = false
        draft.followingError = action.error
        break
      case FOLLOW_LIST_REQUEST:
        draft.followListLoading = true
        draft.followListDone = false
        draft.followListError = null
        break
      case FOLLOW_LIST_SUCCESS:
        draft.followListLoading = false
        draft.followListDone = true
        draft.followList = draft.followList.concat(action.data)
        break
      case FOLLOW_LIST_FAILURE:
        draft.followListLoading = false
        draft.followListError = action.error
        break
      default:
        break
    }
  })

export default reducer
