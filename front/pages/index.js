import React, { useEffect } from "react"
import axios from "axios"
import { END } from "redux-saga"

import Layout from "../components/Layout"
import wrapper from "../store/configureStore"
import MainList from "../components/MainList"
import { LOAD_USER_REQUEST } from "../reducers/user"
import { NOW_SCREENING_MOVIE_REQUEST } from "../reducers/movie"

const Main = () => {
  return (
    <Layout>
      <MainList />
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
      type: NOW_SCREENING_MOVIE_REQUEST,
    })

    context.store.dispatch(END)
    await context.store.sagaTask.toPromise()
    return { props: {} }
  },
)

export default Main
