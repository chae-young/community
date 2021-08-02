import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import Link from "next/link"

import { makeStyles } from "@material-ui/core/styles"
import { Avatar } from "@material-ui/core"

import Layout from "./Layout"

const useStyles = makeStyles((theme) => ({
  root: {},
  size: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}))

const ProfileLayout = ({ children, userInfo = null }) => {
  const classes = useStyles()
  const { me } = useSelector((state) => state.user)

  return (
    <Layout>
      <h2>{userInfo.nickname}님 프로필</h2>
      {me ? (
        <Link href="/profile/edit">
          <a>
            <Avatar
              alt={userInfo.nickname}
              src={userInfo && `http://localhost:3063/${userInfo.src}`}
              className={classes.size}
            />
          </a>
        </Link>
      ) : (
        <Avatar
          alt={userInfo.nickname}
          src={userInfo && `http://localhost:3063/${userInfo.src}`}
          className={classes.size}
        />
      )}
      <ul>
        <li>
          <Link href={`/users/${userInfo.id}/contents/posts`}>
            <a>게시글 {userInfo.Posts}</a>
          </Link>
        </li>
        <li>팔로워 {userInfo.Followers}</li>
        <li>팔로잉 {userInfo.Followings}</li>
      </ul>
      {children}
    </Layout>
  )
}

ProfileLayout.defaultProps = {
  userInfo: null,
}

ProfileLayout.propTypes = {
  children: PropTypes.node.isRequired,
  userInfo: PropTypes.shape({
    nickname: PropTypes.string,
  }),
}

export default ProfileLayout
