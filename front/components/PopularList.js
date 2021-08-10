import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Grid } from "@material-ui/core"

import PostListContent from "./PostListContent"
import { POPULAR_POSTS_REQUEST } from "../reducers/post"

const PopularList = () => {
  const dispatch = useDispatch()
  const { popularPosts } = useSelector((state) => state.post)

  // useEffect(() => {
  //   if (!popularPosts.length) {
  //     dispatch({
  //       type: POPULAR_POSTS_REQUEST,
  //       data: 3,
  //     })
  //   }
  // }, [popularPosts])
  return (
    <>
      {popularPosts.map((v) => (
        <Grid container wrap="nowrap" spacing={2}>
          <PostListContent post={v} xs={12} sm={12} />
        </Grid>
      ))}
    </>
  )
}

export default PopularList
