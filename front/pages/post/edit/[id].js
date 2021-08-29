import axios from "axios"
import { useSelector } from "react-redux"
import { END } from "redux-saga"

import Layout from "../../../components/Layout"
import PostForm from "../../../components/PostForm"
import wrapper from "../../../store/configureStore"
import { LOAD_USER_REQUEST } from "../../../reducers/user"
import { LOAD_POST_REQUEST } from "../../../reducers/post"

const PostEdit = () => {
  return (
    <Layout>
      <PostForm />
    </Layout>
  )
}
export default PostEdit

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
      type: LOAD_POST_REQUEST,
      data: context.params.id,
    })

    context.store.dispatch(END)
    await context.store.sagaTask.toPromise()

    return { props: {} }
  },
)
