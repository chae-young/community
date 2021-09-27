import React, { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import Head from "next/head"
import Link from "next/link"
import axios from "axios"
import { END } from "redux-saga"

import { Grid } from "@material-ui/core"
import { Rating } from "@material-ui/lab"

import styled from "styled-components"
const Layout = dynamic(() => import("../../components/Layout"))
const CommentList = dynamic(() => import("../../components/Comment"))
const AlertLogin = dynamic(() => import("../../components/AlertLogin"), {
  ssr: false,
})
const EditSettingMenu = dynamic(() =>
  import("../../components/EditSettingMenu"),
)
import CommentForm from "../../components/Comment/CommentForm"
import { LOAD_POST_REQUEST, POPULAR_POSTS_REQUEST } from "../../reducers/post"
import PopularList from "../../components/List/post/PostFavorite"
import wrapper from "../../store/configureStore"
import { LOAD_USER_REQUEST } from "../../reducers/user"
import ShareList from "../../components/Share"
import Favorite from "../../components/Post/favorite"
import ProfileAvatar from "../../components/Profile/Avatar"
import { headerHeight } from "../../styles/style"

const Post = () => {
  const router = useRouter()
  const { id } = router.query
  const Sharebox = useRef(null)
  const PostArticle = useRef(null)
  const [refVisible, setRefVisible] = useState(false)
  const { me } = useSelector((state) => state.user)
  if (!me) {
    return <AlertLogin />
  }

  const { singlePost } = useSelector((state) => state.post)
  const img = singlePost?.Images[0].src

  const [windowWidth, setWindowWidth] = useState(0)
  let timer
  const resizeWindow = () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      setWindowWidth(window.innerWidth)
    }, 500)
  }
  const [shareBoxStlye, setShaerBoxStlye] = useState(null)
  useEffect(() => {
    if (!refVisible) {
      return
    }
    if (Sharebox.current && PostArticle.current) {
      setShaerBoxStlye((prevState) => ({
        position: "absolute",
        top: 0,
        left: `${PostArticle.current.offsetLeft / 2}px`,
        transform: `translateY(${PostArticle.current.offsetTop}px)`,
      }))
    }
    setWindowWidth(window.innerWidth)
    function fixItem() {
      const endHeight =
        PostArticle.current.offsetHeight - Sharebox.current.offsetHeight
      if (window.scrollY >= endHeight) {
        setShaerBoxStlye((prevState) => ({
          ...prevState,
          transform: `translateY(${endHeight}px)`,
        }))
      } else if (window.scrollY >= PostArticle.current.offsetTop) {
        setShaerBoxStlye((prevState) => ({
          ...prevState,
          transform: `translateY(${window.scrollY + headerHeight}px)`,
        }))
      } else {
        setShaerBoxStlye((prevState) => ({
          ...prevState,
          transform: `translateY(${PostArticle.current.offsetTop}px)`,
        }))
      }
    }
    window.addEventListener("resize", resizeWindow)
    if (windowWidth >= 943) {
      // console.log(windowWidth)
      window.addEventListener("scroll", fixItem)
    }
    return () => {
      window.removeEventListener("resize", resizeWindow)
      window.removeEventListener("scroll", fixItem)
    }
  }, [windowWidth, refVisible])

  return (
    <Layout>
      {singlePost && (
        <>
          <Head>
            <title> {singlePost.User.nickname}님의 글</title>
            <meta
              name="description"
              content={singlePost.content}
              key="description"
            />
            <meta
              property="og:title"
              content={`${singlePost.User.nickname}님의 게시글`}
              key="title"
            />
            <meta
              property="og:description"
              content={singlePost.content}
              key="og:description"
            />
            <meta property="og:image" content={singlePost.Images[0]} />
            <meta
              property="og:url"
              content={`https://emotion-feed.com/post/${id}`}
            />
          </Head>
          <GridWrap container>
            <GridContent item xs sm>
              <ArticleWrap
                ref={(el) => {
                  PostArticle.current = el
                  setRefVisible(!!el)
                }}
              >
                <h2>{singlePost.title}</h2>
                <Rating value={singlePost.rating} precision={0.1} readOnly />
                <ArticleUser>
                  <Link href={`/users/${singlePost.User.id}`}>
                    <a>
                      <ProfileAvatar
                        alt={singlePost.User.nickname}
                        src={singlePost.User.src}
                      />
                    </a>
                  </Link>
                  <span className="nickname">{singlePost.User.nickname}</span>
                  <span className="date">{singlePost.createdAt}</span>
                </ArticleUser>
                <ShareList
                  ref={Sharebox}
                  style={shareBoxStlye}
                  width={windowWidth}
                  post={singlePost}
                />
                <div>
                  <img
                    src={img.replace(/\/thumb\//, "/original/")}
                    style={{ maxWidth: "100%" }}
                    alt={singlePost.title}
                  />
                  <ArticleText>{singlePost.content}</ArticleText>
                </div>
                <ArticleBottom>
                  <ArticleFavorit>
                    <Favorite post={singlePost} />
                    {singlePost.Likers.length}명이 좋아합니다
                  </ArticleFavorit>
                  {me.id === singlePost.User.id && <EditSettingMenu id={id} />}
                </ArticleBottom>
              </ArticleWrap>
              <CommentList currentPostId={id} comments={singlePost.Comments} />
              <CommentForm currentPostId={id} comments={singlePost.Comments} />
            </GridContent>
            <GridPopular item xs={12} sm={4} md={3}>
              <PopularList />
            </GridPopular>
          </GridWrap>
        </>
      )}
    </Layout>
  )
}

const ArticleWrap = styled.article`
  > h2 {
    margin-bottom: 2rem;
    font-size: 4rem;
  }
`
const ArticleBottom = styled.div`
  position: relative;
`
const ArticleUser = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 2rem 0;
  font-size: 1.2rem;

  & .nickname {
    padding-left: 1em;
  }
  & .date {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`
const ArticleText = styled.p`
  padding: 4rem 0;
  line-height: 2rem;
  font-size: 1.4rem;
`
const ArticleFavorit = styled.div`
  display: flex;
  align-items: center;
`
const GridWrap = styled(Grid)`
  max-width: 1500px;
  margin: 0 auto 10rem;
  padding: 0 20px;
`
const GridContent = styled(Grid)`
  padding-left: 20vw;
  @media ${({ theme }) => theme.device.maxTablet} {
    padding-left: 0;
  }
`
const GridPopular = styled(Grid)`
  padding: 0 0 40px 4vw;
`

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
      type: LOAD_POST_REQUEST,
      data: context.params.id,
    })
    context.store.dispatch({
      type: POPULAR_POSTS_REQUEST,
      data: 3,
    })
    context.store.dispatch(END)
    await context.store.sagaTask.toPromise()

    return { props: {} }
  },
)

export default Post
