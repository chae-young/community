import React, { useState } from "react"
import { useSelector } from "react-redux"
import LinesEllipsis from "react-lines-ellipsis"
import { Pagination } from "@material-ui/lab"
import usePagination from "./Pagination"
import { PostListLi } from "../styles/style"

const PostList = () => {
  const { postList } = useSelector((state) => state.post)

  const [page, setPage] = useState(1)
  const PER_PAGE = 24 // 페이지내 개수

  const count = Math.ceil(postList.length / PER_PAGE)
  const _DATA = usePagination(postList, PER_PAGE)

  const handleChange = (e, p) => {
    setPage(p)
    _DATA.jump(p)
  }

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
