import produce from "../utill/produce"

export const initialState = {
  nowScreeningMovie: [],
  movieSrhList: [],
  nowScreeningMovieLoading: false,
  nowScreeningMovieDone: false,
  nowScreeningMovieError: null,
  movieSrhLoading: false,
  movieSrhDone: false,
  movieSrhError: null,
}

export const NOW_SCREENING_MOVIE_REQUEST = "NOW_SCREENING_MOVIE_REQUEST"
export const NOW_SCREENING_MOVIE_SUCCESS = "NOW_SCREENING_MOVIE_SUCCESS"
export const NOW_SCREENING_MOVIE_FAILURE = "NOW_SCREENING_MOVIE_FAILURE"

export const MOVIE_SRH_REQUEST = "MOVIE_SRH_REQUEST"
export const MOVIE_SRH_SUCCESS = "MOVIE_SRH_SUCCESS"
export const MOVIE_SRH_FAILURE = "MOVIE_SRH_FAILURE"

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case NOW_SCREENING_MOVIE_REQUEST:
        draft.nowScreeningMovieLoading = true
        draft.nowScreeningMovieDone = false
        break
      case NOW_SCREENING_MOVIE_SUCCESS:
        draft.nowScreeningMovieLoading = false
        draft.nowScreeningMovieDone = true
        draft.nowScreeningMovie = action.data
        break
      case NOW_SCREENING_MOVIE_FAILURE:
        draft.nowScreeningMovieDone = false
        draft.nowScreeningMovieError = action.error
        break
      case MOVIE_SRH_REQUEST:
        draft.movieSrhLoading = true
        draft.movieSrhDone = false
        draft.movieSrhList = []
        break
      case MOVIE_SRH_SUCCESS:
        draft.movieSrhLoading = false
        draft.movieSrhDone = true
        draft.movieSrhList = action.data.items
        break
      case MOVIE_SRH_FAILURE:
        draft.movieSrhDone = false
        draft.movieSrhError = action.error
        break
      default:
        break
    }
  })

export default reducer
