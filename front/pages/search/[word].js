import React, { useEffect, useState, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import axios from "axios"
import { END } from "redux-saga"

import { makeStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"

import wrapper from "../../store/configureStore"
import PostListContent from "../../components/PostListContent"
import { REVIEW_SEARCH_REQUEST } from "../../reducers/post"

const useStyles = makeStyles({
  root: {
    maxWidth: 760,
    padding: "1.5rem",
    margin: "auto",
  },
})

const Search = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const classes = useStyles()
  const { word } = router.query
  const { searchList, postCount, reviewSearchLoading, reviewSearchDone } =
    useSelector((state) => state.post)

  // useEffect(() => {
  //   dispatch({ type: LOAD_USER_REQUEST })
  //   if (postCount === 0 || postCount === 10) {
  //     dispatch({ type: LOAD_POSTS_REQUEST })
  //   }
  // }, [])

  const [flag, setFlag] = useState(false)
  useEffect(() => {
    const loadOnScroll = () => {
      if (
        Math.round(window.scrollY) + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 200
      ) {
        if (reviewSearchDone) setFlag(false)
        if (!flag && !reviewSearchLoading) {
          const lastId = searchList[searchList.length - 1].id
          dispatch({
            type: REVIEW_SEARCH_REQUEST,
            data: lastId,
            word,
          })
          setFlag(true)
        }
      }
    }
    window.addEventListener("scroll", loadOnScroll)
    return () => {
      window.removeEventListener("scroll", loadOnScroll)
    }
  }, [searchList, reviewSearchLoading, flag])

  return (
    <Grid container className={classes.root} spacing={1}>
      {searchList.map((v) => (
        <PostListContent post={v} xs={6} sm={3} />
      ))}
    </Grid>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    context.store.dispatch({
      type: REVIEW_SEARCH_REQUEST,
      data: context.params.word,
    })
    context.store.dispatch(END)
    await context.store.sagaTask.toPromise()

    return { props: {} }
  },
)

export default Search
