import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { END } from "redux-saga"

import Layout from "../components/Layout"
import PostForm from "../components/Post/form"
import { LOAD_USER_REQUEST } from "../reducers/user"
import wrapper from "../store/configureStore"

const Write = () => {
  const router = useRouter()
  const { me } = useSelector((state) => state.user)
  useEffect(() => {
    if (!me) {
      alert("로그인이 필요합니다.")
      router.push("/")
    }
  }, [me])

  return (
    <Layout>
      <PostForm />
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

    context.store.dispatch(END)
    await context.store.sagaTask.toPromise()

    return { props: {} }
  },
)

export default Write
