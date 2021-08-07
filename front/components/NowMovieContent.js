import React from "react"

import Rating from "@material-ui/lab/Rating"

import styled from "styled-components"

const RateStar = styled.div``
const NowMovieContent = ({ post }) => {
  return (
    <>
      <a
        href={`https://movie.naver.com/${post.href}`}
        target="_balnk"
        rel="noopener noreferrer"
      >
        <figure>
          <img src={post.img} alt={post.title} />
          <figcaption>{post.title}</figcaption>
        </figure>
        <RateStar>
          <Rating
            value={post.star && Number(post.star.substring(0, 4)) / 2}
            precision={0.1}
            size="large"
            readOnly
          />
          <span>{post.star && Number(post.star.substring(0, 4))}</span>
        </RateStar>
      </a>
    </>
  )
}

export default NowMovieContent
