import React, { useEffect, useState, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { END } from "redux-saga"

import { makeStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"

import Layout from "../components/Layout"
import wrapper from "../store/configureStore"
import PostListContent from "../components/PostListContent"
import { LOAD_POSTS_REQUEST } from "../reducers/post"
import { LOAD_USER_REQUEST } from "../reducers/user"

const useStyles = makeStyles({
  root: {
    maxWidth: 760,
    padding: "1.5rem",
    margin: "auto",
  },
})

const Board = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { postList, postCount, loadPostLoading, loadPostDone } = useSelector(
    (state) => state.post,
  )
  const [flag, setFlag] = useState(false)
  useEffect(() => {
    const loadOnScroll = () => {
      if (
        Math.round(window.scrollY) + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 200
      ) {
        if (loadPostDone) setFlag(false)
        if (!flag && !loadPostLoading) {
          const lastId = postList[postList.length - 1].id
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          })
          setFlag(true)
        }
      }
    }
    window.addEventListener("scroll", loadOnScroll)
    return () => {
      window.removeEventListener("scroll", loadOnScroll)
    }
  }, [loadPostLoading, flag])

  return (
    <Layout>
      <Grid container className={classes.root} spacing={1}>
        {postList.map((v) => (
          <PostListContent key={v.id} post={v} xs={6} sm={3} />
        ))}
      </Grid>
    </Layout>
  )
}
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : ""
    axios.defaults.headers.Cookie = ""
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie
    }
    context.store.dispatch({
      type: LOAD_USER_REQUEST,
    })
    //if (postCount === 0 || postCount === 10) {
    context.store.dispatch({
      type: LOAD_POSTS_REQUEST,
      //data: context.params.id,
    })
    context.store.dispatch(END)
    await context.store.sagaTask.toPromise()
    return { props: {} }
  },
)

export default Board
