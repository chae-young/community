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
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from "../../reducers/post"
import PopularList from "../../components/PopularList"

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
  const classes = useStyles()

  const { me } = useSelector((state) => state.user)
  const { postList } = useSelector((state) => state.post)
  const { id } = router.query
  const post = postList.find((v) => v.id === parseInt(id))
  const img = post.Images[0].src

  const Liked = post.Likers.find((v) => v.id === me.id)
  const onUnLike = useCallback(() => {
    console.log("좋아요 취소")
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: { postId: post.id, count: post.Likers.length - 1 },
    })
  }, [])
  const onLike = useCallback(() => {
    console.log("좋아요")
    dispatch({
      type: LIKE_POST_REQUEST,
      data: { postId: post.id, count: post.Likers.length + 1 },
    })
  }, [])

  return (
    <Layout>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={8}>
          <h2>{post.title}</h2>
          <div>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <span>id</span>
            <span>날짜</span>
            <Rating value={post.rating} precision={0.1} readOnly />
          </div>
          <div>
            <img
              src={
                img.includes("https://") ? img : `http://localhost:3063/${img}`
              }
              alt={post.title}
            />
            <p>{post.content}</p>
          </div>
          <div>
            <button type="button">
              {Liked ? (
                <Favorite style={{ color: red[600] }} onClick={onUnLike} />
              ) : (
                <FavoriteBorder onClick={onLike} />
              )}
            </button>
            {post.Likers.length}명이 좋아합니다
          </div>
          <CommentList currentPostId={post.id} comments={post.Comments} />
          <CommentForm currentPostId={post.id} comments={post.Comments} />
        </Grid>
        <Grid item xs={4}>
          <PopularList />
        </Grid>
      </Grid>
    </Layout>
  )
}
export default View
