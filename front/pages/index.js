import React, { useEffect } from "react"
import axios from "axios"
import { END } from "redux-saga"
import { useSelector } from "react-redux"

import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation } from "swiper/core"
import "swiper/swiper.min.css"
import "swiper/components/navigation/navigation.min.css"
import Grid from "@material-ui/core/Grid"

import styled from "styled-components"
import Layout from "../components/Layout"
import wrapper from "../store/configureStore"
import { LOAD_USER_REQUEST } from "../reducers/user"
import { DRAMA_POSTS_REQUEST, POPULAR_POSTS_REQUEST } from "../reducers/post"
import PostListContent from "../components/List/post/PostListContent"

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
    1024: {
      slidesPerView: 6,
      spaceBetween: 60,
    },
  }

  return (
    <Layout>
      <MainSlider>
        <h2>인기 포스트</h2>
        <Swiper
          navigation
          slidesPerGroup={1}
          className="mySwiper"
          breakpoints={breakpoints}
        >
          {popularPosts.map((v) => (
            <SwiperSlide>
              <Grid container>
                <PostListContent post={v} xs={12} sm={12} />
              </Grid>
            </SwiperSlide>
          ))}
        </Swiper>
      </MainSlider>
      <MainSlider>
        <h2>드라마</h2>
        <Swiper
          navigation
          slidesPerGroup={1}
          className="mySwiper"
          breakpoints={breakpoints}
        >
          {dramaPosts.map((v) => (
            <SwiperSlide>
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
