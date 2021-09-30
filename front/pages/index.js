import React from "react"
import axios from "axios"
import dynamic from "next/dynamic"
import { END } from "redux-saga"
import { useSelector } from "react-redux"

import SwiperCore, { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper.min.css"
import "swiper/components/navigation/navigation.min.css"

import { Grid } from "@material-ui/core"

import styled from "styled-components"
import wrapper from "../store/configureStore"
import { LOAD_USER_REQUEST } from "../reducers/user"
import { DRAMA_POSTS_REQUEST, POPULAR_POSTS_REQUEST } from "../reducers/post"
import PostListContent from "../components/List/post/PostListContent"

const Layout = dynamic(() => import("../components/Layout"))

SwiperCore.use([Navigation])

const MainSlider = styled.section`
  padding: 0 2rem;
  margin-bottom: 10rem;
  > h2 {
    margin-bottom: 2em;
    font-size: 2rem;
  }
`
const Main = () => {
  const { popularPosts, dramaPosts } = useSelector((state) => state.post)

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

  return (
    <Layout>
      <MainSlider>
        <h2>인기 포스트</h2>
        <Swiper
          slidesPerView={6}
          spaceBetween={60}
          navigation
          observer="true"
          onSwiper={(swiper) => {
            setTimeout(() => {
              console.log(swiper.slides[0].attributes.style)
            }, 1000)
          }}
          breakpoints={breakpoints}
        >
          {popularPosts.map((v) => (
            <SwiperSlide key={v.id}>
              <Grid container>
                <PostListContent post={v} xs={12} sm={12} />
              </Grid>
            </SwiperSlide>
          ))}
        </Swiper>
      </MainSlider>
      <MainSlider>
        <h2>드라마</h2>
        <Swiper navigation breakpoints={breakpoints}>
          {dramaPosts.map((v) => (
            <SwiperSlide key={v.id}>
              <Grid container>
                <PostListContent post={v} xs={12} sm={12} />
              </Grid>
            </SwiperSlide>
          ))}
        </Swiper>
      </MainSlider>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : ""
    axios.defaults.headers.Cookie = ""
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie
    }
    context.store.dispatch({
      type: LOAD_USER_REQUEST,
    })
    context.store.dispatch({
      type: DRAMA_POSTS_REQUEST,
      data: 10,
    })
    context.store.dispatch({
      type: POPULAR_POSTS_REQUEST,
      data: 10,
    })
    context.store.dispatch(END)

    await context.store.sagaTask.toPromise()
    return { props: {} }
  },
)

export default Main
