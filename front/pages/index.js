import React, { useEffect } from "react"
import axios from "axios"
import { END } from "redux-saga"
import { useSelector } from "react-redux"

import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation } from "swiper/core"
import "swiper/swiper.min.css"
import "swiper/components/navigation/navigation.min.css"
import { Grid } from "@material-ui/core"

import Layout from "../components/Layout"
import wrapper from "../store/configureStore"
import { LOAD_USER_REQUEST } from "../reducers/user"
import { NOW_SCREENING_MOVIE_REQUEST } from "../reducers/movie"
import { POPULAR_POSTS_REQUEST } from "../reducers/post"
import PostListContent from "../components/PostListContent"
import NowMovieContent from "../components/NowMovieContent"

SwiperCore.use([Navigation])

const Main = () => {
  const { popularPosts } = useSelector((state) => state.post)
  const { nowScreeningMovie } = useSelector((state) => state.movie)

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
    <Layout>
      <section>
        <h2>현재 상영영화</h2>
        <Swiper
          navigation={true}
          slidesPerGroup={1}
          className="mySwiper"
          breakpoints={breakpoints}
          style={{ margin: "100px 0 0 0" }}
        >
          {nowScreeningMovie.map((v) => (
            <SwiperSlide>
              <NowMovieContent post={v} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section>
        <h2>인기 포스트</h2>
        <Swiper
          navigation
          slidesPerGroup={1}
          className="mySwiper"
          breakpoints={breakpoints}
          style={{ margin: "100px 0 0 0" }}
        >
          {popularPosts.map((v) => (
            <SwiperSlide>
              <Grid container wrap="nowrap" spacing={2}>
                <PostListContent post={v} xs={12} sm={12} />
              </Grid>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
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
      type: NOW_SCREENING_MOVIE_REQUEST,
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
