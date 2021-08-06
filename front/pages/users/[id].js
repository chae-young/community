import React from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { END } from "@redux-saga/core"
import { useRouter } from "next/router"

import ProfileLayout from "../../components/ProfileLayout"
import { LOAD_USER_REQUEST, USER_INFO_REQUEST } from "../../reducers/user"
import wrapper from "../../store/configureStore"
import Layout from "../../components/Layout"
import { useEffect } from "react"

const Users = () => {
  const router = useRouter()
  const { id } = router.query
  const { me, userInfo } = useSelector((state) => state.user)

  useEffect(() => {
    if (!me) {
      alert("로그인이 필요합니다.")
      router.push("/")
    }
  }, [me])

  if (!userInfo) {
    return <div>로딩중</div>
  }

  return <>{me && <ProfileLayout userInfo={userInfo} />}</>
}

// export async function getStaticPaths() {
//   return { paths: [{ params: { id: "0" } }], fallback: true }
// }

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    console.log(context.req)
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
    context.store.dispatch(END)
    await context.store.sagaTask.toPromise()
    console.log("getState", context.store.getState().user.userInfo)
    return { props: {} }
  },
)

// export const getServerSideProps = wrapper.getServerSideProps(
//   async (context) => {
//     const cookie = context.req ? context.req.headers.cookie : ""
//     axios.defaults.headers.Cookie = ""
//     if (context.req && cookie) {
//       axios.defaults.headers.Cookie = cookie
//     }
//     context.store.dispatch({
//       type: LOAD_USER_REQUEST,
//     })
//     context.store.dispatch({
//       type: USER_INFO_REQUEST,
//       data: context.params.id,
//     })
//     context.store.dispatch(END)
//     await context.store.sagaTask.toPromise()
//     return { props: {} }
//   },
// )

export default Users
