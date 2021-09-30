import React, { useEffect } from "react"
import PropTypes from "prop-types"
import Link from "next/link"

import SwiperCore, { Navigation, Lazy } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper.min.css"
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/lazy/lazy.min.css"
import { Grid } from "@material-ui/core"

import styled from "styled-components"
import { ListPoster, ListContent } from "../styles/style"
import PostRating from "./Post/rating"

SwiperCore.use([Navigation, Lazy])

const Slider = ({ title, dataList }) => {
  const breakpoints = {
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    767: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1199: {
      slidesPerView: 6,
      spaceBetween: 60,
    },
  }
  useEffect(() => {
    const swiper = document.querySelectorAll(".swiper-container")
    let timer

    Array.from(swiper).map(
      (v) => (timer = setTimeout(() => v.swiper.lazy.load(), 500)),
    )

    return () => {
      clearTimeout(timer)
    }
  }, [])
  return (
    <MainSlider>
      <h2>{title}</h2>
      <Swiper
        lazy
        preloadImages={false}
        spaceBetween={60}
        watchSlidesProgress
        navigation
        breakpoints={breakpoints}
      >
        {dataList.map((v) => (
          <SwiperSlide key={v.id}>
            <Grid container>
              <Grid item xs={12} sm={12}>
                <Link href={`/post/${v.id}`}>
                  <a>
                    <ListPoster heightVal="25em">
                      <img
                        data-src={v.Images[0].src}
                        width="100%"
                        alt={v.title}
                        className="swiper-lazy"
                      />
                    </ListPoster>
                    <ListContent>
                      <p>{v.title}</p>
                      <PostRating rate={v.rating} />
                    </ListContent>
                  </a>
                </Link>
              </Grid>
            </Grid>
          </SwiperSlide>
        ))}
      </Swiper>
    </MainSlider>
  )
}
Slider.propTypes = {
  title: PropTypes.string,
  dataList: PropTypes.array,
}
const MainSlider = styled.section`
  padding: 0 2rem;
  margin-bottom: 10rem;
  > h2 {
    margin-bottom: 2em;
    font-size: 2rem;
  }
  & img {
    opacity: 0;
    transition: opacity 0.5s ease;
    &.swiper-lazy-loaded {
      opacity: 1;
    }
  }
`
export default Slider
