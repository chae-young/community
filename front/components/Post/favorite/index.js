import React, { useCallback } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"

import { FavoriteBorder, Favorite } from "@material-ui/icons"
import red from "@material-ui/core/colors/red"

import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from "../../../reducers/post"

const FavoriteBtn = ({ post }) => {
  const dispatch = useDispatch()
  const { me } = useSelector((state) => state.user)
  const Liked = post?.Likers.find((v) => v.id === me.id)
  const onUnLike = useCallback(() => {
    // console.log("좋아요 취소")
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: { postId: parseInt(post.id), count: post.Likers.length - 1 },
    })
  }, [post])
  const onLike = useCallback(() => {
    // console.log("좋아요")
    dispatch({
      type: LIKE_POST_REQUEST,
      data: { postId: parseInt(post.id), count: post.Likers.length + 1 },
    })
  }, [post])

  return (
    <button type="button">
      {Liked ? (
        <Favorite style={{ color: red[600] }} onClick={onUnLike} />
      ) : (
        <FavoriteBorder fontSize="large" onClick={onLike} />
      )}
    </button>
  )
}

FavoriteBtn.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    Likers: PropTypes.array,
  }),
}
export default FavoriteBtn
