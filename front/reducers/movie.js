import produce from "immer"

export const initialState = {
  mainMovieLoading: false,
  mainMovieDone: false,
  mainMovieError: null,
}

export const MAIN_MOVIE_REQUEST = "MAIN_MOVIE_REQUEST"
export const MAIN_MOVIE_SUCCESS = "MAIN_MOVIE_SUCCESS"
export const MAIN_MOVIE_FAILURE = "MAIN_MOVIE_FAILURE"

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      default:
        break
    }
  })

export default reducer
