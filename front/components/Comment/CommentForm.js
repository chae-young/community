import React, { useCallback } from "react"
import PropTypes from "prop-types"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import styled from "styled-components"
import { ADD_COMMENT_REQUEST, EDIT_COMMENT_REQUEST } from "../../reducers/post"
import { ButtonPurple } from "../../styles/style"

const CommentForm = ({ ...obj }) => {
  const { currentPostId, comment, edit, content } = obj
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      text: content,
    },
  })

  const onSubmit = useCallback((data) => {
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
  }, [])
  return (
    <CommentFormWrap>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea {...register("text")} />
        <ButtonPurple
          type="submit"
          xs={{ width: "150px", height: "60px", margin: "1.5em auto 0" }}
          sm={{ width: "125px", height: "50px", margin: "1.5em auto 0" }}
        >
          등록
        </ButtonPurple>
      </form>
    </CommentFormWrap>
  )
}

const CommentFormWrap = styled.div`
  ${({ theme }) => `
  width:100%;
  overflow:hidden;
  & textarea{
    width:100%;
    min-height:60px;
    padding:10px;
    overflow-y:auto;
    border:${theme.pointColor.border};
    background:${theme.pointColor.bg};
    resize:none;
    box-sizing:border-box;
  }
  & button{
    float:right;
  }
`}
`

CommentForm.propTypes = {
  id: PropTypes.number.isRequired,
  edit: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
}

export default CommentForm
