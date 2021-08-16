import React from "react"
import Head from "next/head"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import Link from "next/link"

import { makeStyles } from "@material-ui/core/styles"

import styled from "styled-components"
import Layout from "./Layout"
import FollowButton from "./FollowButton"
import { AvatarSize, minContainer } from "../styles/style"

const UserProfile = styled.div`
  ${minContainer}
  text-align: center;
  & h2 {
    margin-bottom: 1.5em;
    font-size: 4rem;
    > b {
      font-wegiht: bold;
      color: ${({ theme }) => theme.pointColor.purple};
    }
  }
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
const UserImg = styled.div``

const ProfileLayout = ({ userInfo }) => {
  //const classes = useStyles()
  const { me } = useSelector((state) => state.user)
  const notMe = me.id !== userInfo.id

  return (
    <>
      <Head>
        <title>{userInfo.nickname}님의 프로필</title>
        <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
      </Head>
      <Layout>
        <UserProfile>
          <h2>
            <b>{userInfo.nickname}</b>님 프로필
          </h2>
          <ProfileWrap>
            <UserImg>
              {notMe && <FollowButton id={userInfo.id} />}
              {!notMe && (
                <Link href={`/edit/${userInfo.id}`}>
                  <a>
                    <AvatarSize
                      alt={userInfo.nickname}
                      src={`http://localhost:3063/profile/${userInfo.src}`}
                    />
                  </a>
                </Link>
              )}
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

ProfileLayout.defaultProps = {
  userInfo: null,
}

ProfileLayout.propTypes = {
  userInfo: PropTypes.shape({
    id: PropTypes.number,
    nickname: PropTypes.string,
    src: PropTypes.string,
    Posts: PropTypes.number,
    Followers: PropTypes.number,
    Followings: PropTypes.number,
  }),
}

export default ProfileLayout
