import React from "react"
import Head from "next/head"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import Link from "next/link"

import { makeStyles } from "@material-ui/core/styles"
import { Avatar } from "@material-ui/core"

import Layout from "./Layout"
import FollowButton from "./FollowButton"

const useStyles = makeStyles((theme) => ({
  root: {},
  size: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}))

const ProfileLayout = ({ children, userInfo }) => {
  const classes = useStyles()
  const { me } = useSelector((state) => state.user)
  const notMe = me.id !== userInfo.id

  return (
    <>
      <Head>
        <title>{userInfo.nickname}님의 프로필</title>
        <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
      </Head>
      <Layout>
        <h2>{userInfo.nickname}님 프로필</h2>
        {notMe && <FollowButton id={userInfo.id} />}
        {!notMe ? (
          <Link href={`/edit/${userInfo.id}`}>
            <a>
              <Avatar
                alt={userInfo.nickname}
                src={`http://localhost:3063/profile/${userInfo.src}`}
                className={classes.size}
              />
            </a>
          </Link>
        ) : (
          <Avatar
            alt={userInfo.nickname}
            src={
              userInfo.src && `http://localhost:3063/profile/${userInfo.src}`
            }
            className={classes.size}
          />
        )}
        <ul>
          <li>
            <Link href={`/users/${userInfo.id}/contents/posts`}>
              <a>게시글 {userInfo.Posts}</a>
            </Link>
          </li>
          <li>
            <Link
              href={{
                pathname: "/users/[id]/follow",
                query: {
                  id: userInfo.id,
                  title: "follower",
                },
              }}
              as={`/users/${userInfo.id}/follow`}
            >
              <a>팔로워 {userInfo.Followers}</a>
            </Link>
          </li>
          <li>
            <Link
              href={{
                pathname: "/users/[id]/follow",
                query: {
                  id: userInfo.id,
                  title: "following",
                },
              }}
              as={`/users/${userInfo.id}/follow`}
            >
              <a>팔로잉 {userInfo.Followings}</a>
            </Link>
          </li>
        </ul>
        {children}
      </Layout>
    </>
  )
}

ProfileLayout.defaultProps = {
  userInfo: null,
}

ProfileLayout.propTypes = {
  children: PropTypes.node.isRequired,
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
