import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import LinesEllipsis from "react-lines-ellipsis"
import { Pagination } from "@material-ui/lab"
import { PostListLi } from "../styles/style"
import { MAIN_MOVIE_REQUEST } from "../reducers/movie"

const PostList = () => {
  const dispatch = useDispatch()
  const { postList } = useSelector((state) => state.post)

  useEffect(() => {
    dispatch({
      type: MAIN_MOVIE_REQUEST,
    })
  })

  return (
    <>
      <ul>
        {postList.map((v) => (
          <PostListLi key={v.id}>
            {v.Images[0] && (
              <div className="post-list__img">
                <img src={v.Images[0].src} alt="" />
              </div>
            )}
            <div className="post-list__con">
              <LinesEllipsis
                text={v.post.title}
                maxLine="1"
                ellipsis="..."
                trimRight
              />
              <span>댓글{v.Comments.length}</span>
            </div>
          </PostListLi>
        ))}
      </ul>

      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </>
  )
}

export default PostList
