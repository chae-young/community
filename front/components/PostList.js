import React, { useEffect, useState, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"

import { makeStyles } from "@material-ui/core/styles"
import { Grid, Card, CardHeader, CardMedia } from "@material-ui/core"
import { Rating } from "@material-ui/lab"

import styled from "styled-components"
import { LOAD_POST_REQUEST } from "../reducers/post"
import { LOAD_USER_REQUEST } from "../reducers/user"

const useStyles = makeStyles({
  root: {
    maxWidth: 760,
    padding: "1.5rem",
    margin: "auto",
  },
})
const ListPoster = styled.div`
  width: 100%;
  height: 25em;
  overflow: hidden;
  & img {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: auto;
  }
`
const ListContent = styled.div``

const PostList = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { postList, postCount, loadPostLoading, loadPostDone } = useSelector(
    (state) => state.post,
  )
  useEffect(() => {
    dispatch({ type: LOAD_USER_REQUEST })
    if (postCount) {
      dispatch({
        type: LOAD_POST_REQUEST,
      })
    }
  }, [])

  const [flag, setFlag] = useState(false)
  useEffect(() => {
    const loadOnScroll = () => {
      if (
        Math.round(window.scrollY) + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 200
      ) {
        if (loadPostDone) setFlag(false)
        if (!flag && !loadPostLoading) {
          const lastId = postList[postList.length - 1].id
          dispatch({
            type: LOAD_POST_REQUEST,
            lastId,
          })
          setFlag(true)
        }
      }
    }
    window.addEventListener("scroll", loadOnScroll)
    return () => {
      window.removeEventListener("scroll", loadOnScroll)
    }
  }, [loadPostLoading, flag])

  return (
    <Grid container className={classes.root} spacing={1}>
      {postList.map((v) => (
        <Grid key={v.id} item xs={6} sm={3}>
          <Link href={`/view/${v.id}`}>
            <a>
              <ListPoster>
                <img src={v.Images[0].src} width="100%" />
              </ListPoster>
              <ListContent>
                <p>{v.title}</p>
                <Rating
                  name="read-only"
                  precision={0.5}
                  value={v.rating}
                  readOnly
                />
                {v.rating}
              </ListContent>
            </a>
          </Link>
        </Grid>
      ))}
    </Grid>
  )
}

export default PostList
