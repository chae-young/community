import React from "react"
import Link from "next/link"

import { Grid } from "@material-ui/core"
import { Rating } from "@material-ui/lab"

import styled from "styled-components"

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

const PostListContent = ({ post, ...rest }) => {
  const { xs, sm } = rest

  return (
    <Grid key={post.id} item xs={xs} sm={sm}>
      <Link
        href={{
          pathname: `/view/${post.id}`,
          //query: { id: post.id, post: JSON.stringify(v) },
        }}
        //as={`/view/${post.id}}`}
      >
        <a>
          <ListPoster>
            <img
              src={
                post.Images[0].src.includes("https://")
                  ? post.Images[0].src
                  : `http://localhost:3063/${post.Images[0].src}`
              }
              width="100%"
              alt={post.title}
            />
          </ListPoster>
          <ListContent>
            <p>{post.title}</p>
            <Rating
              name="read-only"
              precision={0.5}
              value={post.rating}
              readOnly
            />
            {post.rating}
          </ListContent>
        </a>
      </Link>
    </Grid>
  )
}

export default PostListContent
