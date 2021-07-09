import React, { useState } from "react"
import { useRouter } from "next/router"

import { makeStyles } from "@material-ui/core/styles"
import { Grid, Avatar } from "@material-ui/core"
import Rating from "@material-ui/lab/Rating"
import { FavoriteBorder } from "@material-ui/icons"

import Layout from "../../components/Layout"
import CommentForm from "../../components/CommentForm"
import CommentList from "../../components/CommentList"

const useStyles = makeStyles({
  root: {
    maxWidth: 1500,
    paddingLeft: "20rem",
    margin: "auto",
  },
})

const View = () => {
  const router = useRouter()
  const { id } = router.query
  const classes = useStyles()
  const [value, setValue] = useState(4.66)

  return (
    <Layout>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={8}>
          <h2>{id} 제목제목</h2>
          <div>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <span>id</span>
            <span>날짜</span>
            <Rating value={value} precision={0.1} readOnly />
          </div>
          <div>
            <img />
            컨텐츠
          </div>
          <div>
            <FavoriteBorder /> 명이 좋아합니다
          </div>
          <CommentList id={id} />
          <CommentForm id={id} />
        </Grid>
        <Grid item xs={4}>
          인기 게시글~~
        </Grid>
      </Grid>
    </Layout>
  )
}
export default View
