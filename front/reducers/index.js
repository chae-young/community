import { HYDRATE } from "next-redux-wrapper"
import { combineReducers } from "redux"
import user from "./user"
import post from "./post"
import movie from "./movie"

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE", action)
      return { ...state, ...action.payload }
    default: {
      const combinedReducer = combineReducers({
        user,
        post,
        movie,
      })
      return combinedReducer(state, action)
    }
  }
}

export default rootReducer
