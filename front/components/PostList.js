import React from "react"
import { useSelector } from "react-redux"
import LinesEllipsis from "react-lines-ellipsis"
import { PostListLi } from "../styles/style"

const PostList = () => {
  const { postList } = useSelector(state => state.post)

  return (
    <ul>
      {postList.map(v => (
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
  )
}

export default PostList
