import React, { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import axios from "axios"
import { END } from "redux-saga"

import { makeStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"

import wrapper from "../../store/configureStore"
import PostListContent from "../../components/List/post/PostListContent"
import { REVIEW_SEARCH_REQUEST } from "../../reducers/post"
import Layout from "../../components/Layout"
import { LOAD_USER_REQUEST } from "../../reducers/user"
import useInfiniteScroll from "../../hooks/useInfiniteScroll"

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
      <Grid container className={classes.root} spacing={1}>
        {searchList.map((v) => (
          <PostListContent post={v} xs={6} sm={3} />
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
      type: REVIEW_SEARCH_REQUEST,
      data: context.params.word,
    })
    context.store.dispatch(END)
    await context.store.sagaTask.toPromise()

    return { props: {} }
  },
)

export default Search
