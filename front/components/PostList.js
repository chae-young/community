import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MAIN_MOVIE_REQUEST } from "../reducers/movie"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation } from "swiper/core"

import "swiper/swiper.min.css"
import styled from "styled-components"

SwiperCore.use([Navigation])

const PostList = () => {
  const dispatch = useDispatch()
  const { postList } = useSelector((state) => state.post)

  const breakpoints = {
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 10,
    },
  }
  return (
    <>
      <Swiper
        navigation
        slidesPerGroup={1}
        spaceBetween={10}
        className="mySwiper"
        breakpoints={breakpoints}
      >
        {postList.map((v) => (
          <SwiperSlide>
            <figure>
              <img src={v.Images[0].src} alt={v.post.title} />
              <figcaption>{v.post.title}</figcaption>
            </figure>
            <span>{v.post.rate}</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default PostList
