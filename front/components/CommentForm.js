import React, { useState } from "react"
import PropTypes from "prop-types"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import { Button } from "@material-ui/core"

import { ADD_COMMENT_REQUEST } from "../reducers/post"

const CommentForm = ({ id }) => {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { postId: id, text: data.text },
    })
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
  id: PropTypes.string.isRequired,
}

export default CommentForm
