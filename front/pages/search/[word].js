import React, { useCallback } from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { END } from "redux-saga"

import { Grid } from "@material-ui/core"

import styled from "styled-components"
import wrapper from "../../store/configureStore"
import PostListContent from "../../components/List/post/PostListContent"
import { REVIEW_SEARCH_REQUEST } from "../../reducers/post"
import { LOAD_USER_REQUEST } from "../../reducers/user"
const Layout = dynamic(() => import("../../components/Layout"))
import useInfiniteScroll from "../../components/Layout"

const Search = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { word } = router.query
  const { searchList, reviewSearchLoading, reviewSearchDone } = useSelector(
    (state) => state.post,
  )

  const scrollDispatch = useCallback(() => {
    const lastId = searchList[searchList.length - 1].id
    dispatch({
      type: REVIEW_SEARCH_REQUEST,
      data: lastId,
      word,
    })
  }, [searchList])

  const infiniteScroll = useInfiniteScroll(
    searchList,
    reviewSearchLoading,
    reviewSearchDone,
    scrollDispatch,
  )

  return (
    <Layout>
      <Head>
        <meta name="description" content={`emotin | ${word} 의 검색결과`} />
        <meta property="og:title" content={`emotin | ${word} 의 검색결과`} />
        <meta
          property="og:description"
          content={`emotin | ${word} 의 검색결과`}
        />
      </Head>

      <GridContent container>
        {searchList.map((v) => (
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
  margin: 0 auto;
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
      type: REVIEW_SEARCH_REQUEST,
      data: context.params.word,
    })
    context.store.dispatch(END)
    await context.store.sagaTask.toPromise()

    return { props: {} }
  },
)

export default Search
