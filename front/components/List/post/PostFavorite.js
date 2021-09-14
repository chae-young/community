import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { Grid } from "@material-ui/core"

import PostListContent from "./PostListContent"

const PostFavorite = () => {
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
        <Grid key={v.id} container wrap="nowrap">
          <PostListContent
            post={v}
            xs={12}
            sm={12}
            padding={{ d: "0 0 80px 0", m: "80px 0 0 0" }}
          />
        </Grid>
      ))}
    </>
  )
}

export default PostFavorite
