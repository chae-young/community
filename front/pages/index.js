import React, { useEffect, useState } from "react"
import axios from "axios"
import dynamic from "next/dynamic"
import { END } from "redux-saga"
import { useSelector } from "react-redux"

import wrapper from "../store/configureStore"
import { LOAD_USER_REQUEST } from "../reducers/user"
import { DRAMA_POSTS_REQUEST, POPULAR_POSTS_REQUEST } from "../reducers/post"

const Layout = dynamic(() => import("../components/Layout"))
const DynamicSlider = dynamic(() => import("../components/Slider"), {
  loading: () => <p>...</p>,
})

const Main = () => {
  const { popularPosts, dramaPosts } = useSelector((state) => state.post)

  return (
    <Layout>
      <DynamicSlider title="인기 포스트" dataList={popularPosts} />
      <DynamicSlider title="드라마" dataList={dramaPosts} />

      {/* <MainSlider>
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
      </MainSlider> */}
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
