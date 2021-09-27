import React, { useCallback } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import axios from "axios"
import { END } from "redux-saga"
import { useDispatch, useSelector } from "react-redux"

import { Grid } from "@material-ui/core"

import styled from "styled-components"
import wrapper from "../../../../store/configureStore"
import { LOAD_USER_REQUEST, USER_INFO_REQUEST } from "../../../../reducers/user"
import { USER_POSTS_REQUEST } from "../../../../reducers/post"
import PostListContent from "../../../../components/List/post/PostListContent"
const Layout = dynamic(() => import("../../../../components/Layout"))
import useInfiniteScroll from "../../../../hooks/useInfiniteScroll"
import { PostTitle } from "../../../../styles/style"

const Posts = () => {
  const { query } = useRouter()
  const { id } = query
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.user)

  const { postList, loadPostsLoading, loadPostsDone } = useSelector(
    (state) => state.post,
  )
  const scrollDispatch = useCallback(() => {
    const lastId = postList[postList.length - 1].id
    dispatch({
      type: USER_POSTS_REQUEST,
      data: {
        id,
        lastId,
      },
    })
  }, [postList])

  const infiniteScroll = useInfiniteScroll(
    postList,
    loadPostsLoading,
    loadPostsDone,
    scrollDispatch,
  )

  return (
    <>
      {userInfo && (
        <Layout>
          <Head>
            <title>
              {userInfo.nickname}
              님의 글
            </title>
            <meta
              name="description"
              content={`${userInfo.nickname}님의 게시글`}
            />
            <meta
              property="og:title"
              content={`${userInfo.nickname}님의 게시글`}
            />
            <meta
              property="og:description"
              content={`${userInfo.nickname}님의 게시글`}
            />
            <meta
              property="og:image"
              content="https://emotion-feed.com/favicon.ico"
            />
            <meta
              property="og:url"
              content={`https://emotion-feed.com/user/${id}`}
            />
          </Head>
          <PostTitle>
            <b>{userInfo.nickname}</b>님의 포스트
          </PostTitle>
          <GridContent container>
            {postList.map((v) => (
              <PostListContent
                key={v.id}
                post={v}
                xs={6}
                sm={3}
                padding={{ d: "0 1rem 8rem 1rem", m: "0 20px 40px 20px" }}
              />
            ))}
          </GridContent>
        </Layout>
      )}
    </>
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
      type: USER_INFO_REQUEST,
      data: context.params.id,
    })
    context.store.dispatch({
      type: USER_POSTS_REQUEST,
      data: { id: context.params.id },
    })
    context.store.dispatch(END)
    await context.store.sagaTask.toPromise()
    return { props: {} }
  },
)

export default Posts
