import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import dynamic from "next/dynamic"
import { END } from "redux-saga"

import { Grid } from "@material-ui/core"

import styled from "styled-components"
const Layout = dynamic(() => import("../components/Layout"))
import useInfiniteScroll from "../hooks/useInfiniteScroll"
import wrapper from "../store/configureStore"
import PostListContent from "../components/List/post/PostListContent"
import { LOAD_POSTS_REQUEST } from "../reducers/post"
import { LOAD_USER_REQUEST } from "../reducers/user"

const Board = () => {
  const dispatch = useDispatch()
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

  return (
    <Layout>
      <GridContent container>
        {postList.map((v) => (
          <PostListContent
            key={v.id}
            post={v}
            xs={6}
            sm={4}
            padding={{ d: "0 1rem 8rem 1rem", m: "0 20px 40px 20px" }}
          />
        ))}
      </GridContent>
    </Layout>
  )
}
const GridContent = styled(Grid)`
  max-width: 1000px;
  margin: auto;
`
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
      type: LOAD_POSTS_REQUEST,
    })
    context.store.dispatch(END)
    await context.store.sagaTask.toPromise()
    return { props: {} }
  },
)

export default Board
