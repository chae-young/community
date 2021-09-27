import axios from "axios"
import React from "react"
import dynamic from "next/dynamic"
import { useSelector } from "react-redux"
import { END } from "redux-saga"

const Layout = dynamic(() => import("../components/Layout"))
const AlertLogin = dynamic(() => import("../components/AlertLogin"))
import PostForm from "../components/Post/form"
import { LOAD_USER_REQUEST } from "../reducers/user"
import wrapper from "../store/configureStore"

const Write = () => {
  const { me } = useSelector((state) => state.user)
  if (!me) {
    return <AlertLogin />
  }

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
