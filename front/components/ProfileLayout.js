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

const ProfileLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user)
  const classes = useStyles()

  return (
    <Layout>
      <h2>{}님 프로필</h2>
      <Link href="/profile/edit">
        <a>
          <Avatar
            alt=""
            src="http://e-doa.co.kr/DATA/cheditor/20160707180750_dvlyprsi.jpg"
            className={classes.size}
          />
        </a>
      </Link>
      {children}
    </Layout>
  )
}

ProfileLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ProfileLayout
