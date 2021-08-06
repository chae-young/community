import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { END } from "@redux-saga/core"

import axios from "axios"
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListSubheader,
  ListItemSecondaryAction,
  Avatar,
} from "@material-ui/core"

import wrapper from "../../../store/configureStore"
import {
  FOLLOW_LIST_REQUEST,
  LOAD_USER_REQUEST,
  USER_INFO_REQUEST,
} from "../../../reducers/user"
import FollowButton from "../../../components/FollowButton"

const Follow = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { id, follow } = router.query
  const { userInfo, followList, followListDone, followListLoading } =
    useSelector((state) => state.user)

  //처음에만 20개 불러오고 스크롤 내릴때마다 10개..
  const [flag, setFlag] = useState(false)
  useEffect(() => {
    const loadOnScroll = () => {
      if (
        Math.round(window.scrollY) + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 200
      ) {
        if (followListDone) setFlag(false)
        if (!flag && !followListLoading) {
          dispatch({
            type: FOLLOW_LIST_REQUEST,
            data: { userId: id, name: follow, limit: 10 },
          })
          setFlag(true)
        }
      }
    }
    window.addEventListener("scroll", loadOnScroll)
    return () => {
      window.removeEventListener("scroll", loadOnScroll)
    }
  }, [followListLoading, flag])

  return (
    <>
      <List
        subheader={
          <ListSubheader>{`${userInfo.nickname}님의 ${follow}`}</ListSubheader>
        }
      >
        {followList.map((v) => (
          <Link href={`/users/${v.id}`}>
            <a>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    alt={v.nickname}
                    src={`http://localhost:3063/profile/${v.src}`}
                  />
                </ListItemAvatar>
                <ListItemText primary={v.nickname} />
                <ListItemSecondaryAction>
                  <FollowButton id={v.id} />
                </ListItemSecondaryAction>
              </ListItem>
            </a>
          </Link>
        ))}
      </List>
    </>
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
      type: USER_INFO_REQUEST,
      data: context.params.id,
    })
    context.store.dispatch({
      type: FOLLOW_LIST_REQUEST,
      data: {
        userId: context.params.id,
        name: context.params.follow,
        limit: 20,
      },
    })
    context.store.dispatch(END)
    await context.store.sagaTask.toPromise()
    console.log("getState", context.store.getState().user.userInfo)
    return { props: {} }
  },
)

export default Follow
