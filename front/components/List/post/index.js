// import React, { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"

// import { Grid } from "@material-ui/core"

// import styled from "styled-components"
// import { LOAD_POSTS_REQUEST } from "../../../reducers/post"
// import { LOAD_USER_REQUEST } from "../../../reducers/user"
// import PostListContent from "./PostListContent"

// const PostList = () => {
//   const dispatch = useDispatch()
//   const classes = useStyles()
//   const { postList, postCount, loadPostLoading, loadPostDone } = useSelector(
//     (state) => state.post,
//   )
//   useEffect(() => {
//     dispatch({ type: LOAD_USER_REQUEST })
//     if (postCount === 0 || postCount === 10) {
//       dispatch({ type: LOAD_POSTS_REQUEST })
//     }
//   }, [])

//   const [flag, setFlag] = useState(false)
//   useEffect(() => {
//     const loadOnScroll = () => {
//       if (
//         Math.round(window.scrollY) + document.documentElement.clientHeight >=
//         document.documentElement.scrollHeight - 200
//       ) {
//         if (loadPostDone) setFlag(false)
//         if (!flag && !loadPostLoading) {
//           const lastId = postList[postList.length - 1].id
//           dispatch({
//             type: LOAD_POSTS_REQUEST,
//             lastId,
//           })
//           setFlag(true)
//         }
//       }
//     }
//     window.addEventListener("scroll", loadOnScroll)
//     return () => {
//       window.removeEventListener("scroll", loadOnScroll)
//     }
//   }, [loadPostLoading, flag])

//   return (
//     <GridContent container className={classes.root} spacing={1}>
//       {postList.map((v) => (
//         <PostListContent
//           key={v.id}
//           post={v}
//           xs={6}
//           sm={3}
//           padding={{ d: "0 1rem 8rem 1rem", m: "80px 0 0 0" }}
//         />
//       ))}
//     </GridContent>
//   )
// }
// const GridContent = styled(Grid)`
// maxWidth: 760,
// padding: 1.5rem,
// margin: auto,
// `
// export default PostList
