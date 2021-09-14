import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { END } from "redux-saga"

import { makeStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"

import Layout from "../components/Layout"
import wrapper from "../store/configureStore"
import PostListContent from "../components/List/post/PostListContent"
import { LOAD_POSTS_REQUEST } from "../reducers/post"
import { LOAD_USER_REQUEST } from "../reducers/user"
import useInfiniteScroll from "../hooks/useInfiniteScroll"

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
    margin: "auto",
  },
})

const Board = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { postList, loadPostsLoading, loadPostsDone } = useSelector(
    (state) => state.post,
  )
  const scrollDispatch = useCallback(() => {
    const lastId = postList[postList.length - 1].id
    dispatch({
      type: LOAD_POSTS_REQUEST,
      lastId,
    })
  }, [postList])

  const infiniteScroll = useInfiniteScroll(
    postList,
    loadPostsLoading,
    loadPostsDone,
    scrollDispatch,
  )

  // const [flag, setFlag] = useState(false)
  // useEffect(() => {
  //   const loadOnScroll = () => {
  //     if (
  //       Math.round(window.scrollY) + document.documentElement.clientHeight >=
  //       document.documentElement.scrollHeight - 200
  //     ) {
  //       if (loadPostsDone) setFlag(false)
  //       if (!flag && !loadPostsLoading) {
  //         const lastId = postList[postList.length - 1].id
  //         dispatch({
  //           type: LOAD_POSTS_REQUEST,
  //           lastId,
  //         })
  //         setFlag(true)
  //       }
  //     }
  //   }
  //   window.addEventListener("scroll", loadOnScroll)
  //   return () => {
  //     window.removeEventListener("scroll", loadOnScroll)
  //   }
  // }, [postList, loadPostsLoading, flag])

  return (
    <Layout>
      <Grid container className={classes.root}>
        {postList.map((v) => (
          <PostListContent
            key={v.id}
            post={v}
            xs={6}
            sm={4}
            padding={{ d: "0 1rem 8rem 1rem", m: "0 20px 40px 20px" }}
          />
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
    // if (postCount === 0 || postCount === 10) {
    context.store.dispatch({
      type: LOAD_POSTS_REQUEST,
      // data: context.params.id,
    })
    context.store.dispatch(END)
    await context.store.sagaTask.toPromise()
    return { props: {} }
  },
)

export default Board
