import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { makeStyles } from "@material-ui/core/styles"
import { Grid, Card, CardHeader, CardMedia } from "@material-ui/core"
import { Rating } from "@material-ui/lab"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 760,
    padding: "1.5rem",
    margin: "auto",
  },
}))

const PostList = () => {
  const classes = useStyles()
  const { postList } = useSelector((state) => state.post)

  return (
    <Grid container className={classes.root} spacing={1}>
      {postList.map((v) => (
        <Grid item xs={6} sm={3}>
          <div>
            <img src={v.Images} />
            <p>{v.post.title}</p>
            <div>
              <Rating
                name="read-only"
                precision={0.5}
                value={v.post.rating}
                readOnly
              />
              {v.post.rating}
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  )
}

export default PostList
