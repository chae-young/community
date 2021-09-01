import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { END } from "redux-saga"
import { useDispatch, useSelector } from "react-redux"

import { makeStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"

import wrapper from "../../../../store/configureStore"
import { LOAD_USER_REQUEST, USER_INFO_REQUEST } from "../../../../reducers/user"
import { USER_POSTS_REQUEST } from "../../../../reducers/post"
import PostListContent from "../../../../components/List/post/PostListContent"
import Layout from "../../../../components/Layout"
import { PostTitle } from "../../../../styles/style"

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
    margin: "auto",
  },
})

const Posts = () => {
  const { query } = useRouter()
  const { id } = query
  const dispatch = useDispatch()
  const classes = useStyles()
  const { userInfo } = useSelector((state) => state.user)
  const { postList, postCount, loadPostsLoading, loadPostsDone } = useSelector(
    (state) => state.post,
  )

  const [flag, setFlag] = useState(false)
  useEffect(() => {
    const loadOnScroll = () => {
      if (
        Math.round(window.scrollY) + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 200
      ) {
        if (loadPostsDone) setFlag(false)
        if (!flag && !loadPostsLoading) {
          const lastId = postList[postList.length - 1].id
          dispatch({
            type: USER_POSTS_REQUEST,
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
  }, [postList, loadPostsLoading, flag])

  return (
    <Layout>
      <PostTitle>
        <b>{userInfo.nickname}</b>님의 포스트
      </PostTitle>
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
    context.store.dispatch({
      type: USER_INFO_REQUEST,
      data: context.params.id,
    })
    context.store.dispatch({
      type: USER_POSTS_REQUEST,
      data: context.params.id,
    })
    context.store.dispatch(END)
    await context.store.sagaTask.toPromise()
    return { props: {} }
  },
)

export default Posts
