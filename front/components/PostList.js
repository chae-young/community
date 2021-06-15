import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Slider from "react-slick"
import LinesEllipsis from "react-lines-ellipsis"
import { MAIN_MOVIE_REQUEST } from "../reducers/movie"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import styled from "styled-components"

const PostListLi = styled.li``

const PostList = () => {
  const dispatch = useDispatch()
  const { postList } = useSelector((state) => state.post)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  }

  return (
    <>
      <Slider {...settings}>
        {postList.map((v) => (
          <PostListLi>
            <figure>
              <img src={v.Images} alt={v.post.title} />
              <figcaption>{v.post.title}</figcaption>
            </figure>
            <span>{v.post.rate}</span>
          </PostListLi>
        ))}
      </Slider>
    </>
  )
}

export default PostList
