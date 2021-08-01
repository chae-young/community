import React from "react"
import PropTypes from "prop-types"
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
    <Grid item xs={xs} sm={sm}>
      <Link href={`/post/${post.id}`}>
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
              value={parseInt(post.rating, 10)}
              readOnly
            />
            {post.rating}
          </ListContent>
        </a>
      </Link>
    </Grid>
  )
}

PostListContent.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    rating: PropTypes.string,
  }).isRequired,
}

export default PostListContent
