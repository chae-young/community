import React, { useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"

import { makeStyles } from "@material-ui/core/styles"
import { Grid, Avatar } from "@material-ui/core"
import Rating from "@material-ui/lab/Rating"
import { FavoriteBorder, Favorite } from "@material-ui/icons"
import red from "@material-ui/core/colors/red"

import Layout from "../../components/Layout"
import CommentForm from "../../components/CommentForm"
import CommentList from "../../components/CommentList"
import { LIKE_POST_REQUEST } from "../../reducers/post"

const useStyles = makeStyles({
  root: {
    maxWidth: 1500,
    paddingLeft: "20rem",
    margin: "auto",
  },
})

const View = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { me } = useSelector((state) => state.user)
  const { post } = router.query
  const currentPost = JSON.parse(post)

  const classes = useStyles()

  const [value, setValue] = useState(4.66)

  const Liked = currentPost.Likers.find((v) => v.id === me.id)
  console.log(Liked)
  const onUnLike = useCallback(() => {
    console.log("좋아요 취소")
    //setLike((prev) => !prev)
  }, [])
  const onLike = useCallback(() => {
    console.log("좋아요")
    dispatch({
      type: LIKE_POST_REQUEST,
      data: currentPost.id,
    })
  }, [])

  return (
    <Layout>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={8}>
          <h2>{currentPost.title}</h2>
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
            <button type="button">
              {Liked ? (
                <Favorite style={{ color: red[600] }} onClick={onUnLike} />
              ) : (
                <FavoriteBorder onClick={onLike} />
              )}
            </button>
            {currentPost.Likers.length}명이 좋아합니다
          </div>
          <CommentList id={currentPost.id} />
          <CommentForm id={currentPost.id} />
        </Grid>
        <Grid item xs={4}>
          인기 게시글~~
        </Grid>
      </Grid>
    </Layout>
  )
}
export default View
