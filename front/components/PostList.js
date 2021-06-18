import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation } from "swiper/core"
import "swiper/swiper.min.css"
import styled from "styled-components"

import { NOW_SCREENING_MOVIE_REQUEST } from "../reducers/movie"

SwiperCore.use([Navigation])

const PostList = () => {
  const dispatch = useDispatch()
  const { nowScreeningMovie, nowScreeningMovieDone } = useSelector(
    (state) => state.movie,
  )

  useEffect(() => {
    if (!nowScreeningMovie.length) {
      dispatch({
        type: NOW_SCREENING_MOVIE_REQUEST,
      })
    }
  }, [])

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
        className="mySwiper"
        breakpoints={breakpoints}
      >
        {nowScreeningMovie.map((v) => (
          <SwiperSlide>
            <figure>
              <img src={v.img} alt={v.title} />
              <figcaption>{v.title}</figcaption>
            </figure>
            <span>{v.star}</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default PostList
