import React from "react"
import Head from "next/head"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import Link from "next/link"

import { makeStyles } from "@material-ui/core/styles"

import styled from "styled-components"
import Layout from "./Layout"
import FollowButton from "./FollowButton"
import { AvatarSize, minContainer, PostTitle } from "../styles/style"

const ProfileLayout = ({ userInfo }) => {
  // const classes = useStyles()
  const { me } = useSelector((state) => state.user)

  return <></>
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
