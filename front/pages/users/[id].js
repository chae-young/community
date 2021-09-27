import React from "react"
import axios from "axios"
import Head from "next/head"
import dynamic from "next/dynamic"
import { useSelector } from "react-redux"
import { END } from "@redux-saga/core"
import Link from "next/link"

import styled from "styled-components"
import { LOAD_USER_REQUEST, USER_INFO_REQUEST } from "../../reducers/user"
import wrapper from "../../store/configureStore"
const Layout = dynamic(() => import("../../components/Layout"))
const FollowButton = dynamic(() => import("../../components/Follow/btn"))
const AlertLogin = dynamic(() => import("../../components/AlertLogin"), {
  ssr: false,
})
import { minContainer, PostTitle } from "../../styles/style"
import ProfileAvatar from "../../components/Profile/Avatar"

const Users = () => {
  const { me, userInfo } = useSelector((state) => state.user)

  if (!me) {
    return <AlertLogin />
  }

  if (!userInfo) {
    return <div>로딩중</div>
  }
  const notMe = me.id !== userInfo.id
  return (
    <>
      <Head>
        <title>{userInfo.nickname}님의 프로필</title>
        <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
      </Head>
      <Layout>
        <UserProfile>
          <PostTitle>
            <b>{userInfo.nickname}</b>님 프로필
          </PostTitle>
          <ProfileWrap>
            <UserImg>
              <Link
                href={
                  notMe ? `/users/${userInfo.id}` : `/users/edit/${userInfo.id}`
                }
              >
                <a>
                  <ProfileAvatar
                    src={userInfo.src}
                    alt={userInfo.nickname}
                    size={140}
                  />
                </a>
              </Link>
              {notMe && <FollowButton id={userInfo.id} />}
            </UserImg>
            <UserInfoBtn>
              <li>
                <Link href={`/users/${userInfo.id}/contents/posts`}>
                  <a>게시글 {userInfo.Posts}</a>
                </Link>
              </li>
              <li>
                <Link href={`/users/${userInfo.id}/followers`}>
                  <a>팔로워 {userInfo.Followers}</a>
                </Link>
              </li>
              <li>
                <Link href={`/users/${userInfo.id}/followings`}>
                  <a>팔로잉 {userInfo.Followings}</a>
                </Link>
              </li>
            </UserInfoBtn>
          </ProfileWrap>
        </UserProfile>
      </Layout>
    </>
  )
}

const UserProfile = styled.div`
  ${minContainer}
  text-align: center;
`
const ProfileWrap = styled.div``
const UserInfoBtn = styled.div`
  max-width: 280px;
  margin: auto;
  display: flex;
  > li {
    flex: 1;
    padding: 2rem 0;
    font-size: 1.2rem;
  }
`
const UserImg = styled.div`
  > button {
    margin-top: 2rem;
  }
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
    context.store.dispatch(END)
    await context.store.sagaTask.toPromise()
    //console.log("getState", context.store.getState().user.userInfo)
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
