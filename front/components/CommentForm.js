import React, { useState, useMemo } from "react"
import PropTypes from "prop-types"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import { Button } from "@material-ui/core"

import { ADD_COMMENT_REQUEST, EDIT_COMMENT_REQUEST } from "../reducers/post"

const CommentForm = ({ ...obj }) => {
  const { currentPostId, comment, edit, content } = obj
  //const currentComment = comments.find((v) => v.PostId === id)
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      text: content,
    },
  })

  const onSubmit = (data) => {
    if (edit) {
      dispatch({
        type: EDIT_COMMENT_REQUEST,
        data: { commentId: comment.id, content: data.text },
      })
    } else {
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: { postId: currentPostId, content: data.text },
      })
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea {...register("text")} />
        <Button type="submit" variant="contained" color="primary">
          등록
        </Button>
      </form>
    </>
  )
}

CommentForm.propTypes = {
  id: PropTypes.number.isRequired,
  edit: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
}

export default CommentForm
