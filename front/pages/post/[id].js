import React, { useState, useCallback, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"
import axios from "axios"
import { END } from "redux-saga"

import { makeStyles } from "@material-ui/core/styles"
import { Grid, Avatar } from "@material-ui/core"
import Rating from "@material-ui/lab/Rating"

import styled from "styled-components"
import Layout from "../../components/Layout"
import CommentForm from "../../components/Comment/CommentForm"
import CommentList from "../../components/Comment"
import { LOAD_POST_REQUEST, POPULAR_POSTS_REQUEST } from "../../reducers/post"
import PopularList from "../../components/List/post/PostFavorite"
import wrapper from "../../store/configureStore"
import { LOAD_USER_REQUEST } from "../../reducers/user"
import ShareList from "../../components/Share"
import EditSettingMenu from "../../components/EditSettingMenu"
import Favorite from "../../components/Post/favorite"
import ProfileAvatar from "../../components/Profile/Avatar"
import AlertLogin from "../../components/AlertLogin"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1500,
    margin: "auto",
    padding: "0 20px",
    [theme.breakpoints.down("sm")]: {},
  },
  content: {
    paddingLeft: "20vw",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
    },
  },
  popular: {
    paddingLeft: "4vw",
  },
}))

const Post = () => {
  const router = useRouter()
  const { id } = router.query
  const classes = useStyles()
  const Sharebox = useRef(null)
  const PostArticle = useRef(null)

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
          transform: `translateY(${window.scrollY}px)`,
        }))
      } else {
        setShaerBoxStlye((prevState) => ({
          ...prevState,
          transform: `translateY(${PostArticle.current.offsetTop}px)`,
        }))
      }
    }
    if (Sharebox.current && PostArticle.current) {
      setShaerBoxStlye((prevState) => ({
        position: "absolute",
        top: 0,
        left: `${PostArticle.current.offsetLeft / 2}px`,
        transform: `translateY(${PostArticle.current.offsetTop}px)`,
      }))
    }
    window.addEventListener("resize", resizeWindow)
    if (windowWidth >= 767) {
      // console.log(windowWidth)
      window.addEventListener("scroll", fixItem)
    }
    return () => {
      window.removeEventListener("resize", resizeWindow)
      window.removeEventListener("scroll", fixItem)
    }
  }, [windowWidth])

  return (
    <Layout>
      {singlePost && (
        <>
          <Head>
            <title> {singlePost.User.nickname}님의 글</title>
          </Head>
          <Grid container className={classes.root}>
            <Grid item xs sm className={classes.content}>
              <ArticleWrap ref={PostArticle}>
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
            </Grid>
            <Grid item xs={12} sm={4} md={3} className={classes.popular}>
              <PopularList />
            </Grid>
          </Grid>
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
    console.log(context.store.getState())
    return { props: {} }
  },
)

export default Post
