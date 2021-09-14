import React, { useCallback, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"

import { styled } from "@material-ui/core/styles"
import { Delete, Create } from "@material-ui/icons"
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ButtonGroup,
  Button,
} from "@material-ui/core"

import CommentForm from "./CommentForm"
import { REMOVE_COMMENT_REQUEST } from "../../reducers/post"
import ProfileAvatar from "../Profile/Avatar"

const OptionButton = styled(Button)({
  minWidth: "25px",
  padding: "0 2px",
  border: 0,
})

const CommentList = ({ currentPostId, comments }) => {
  const dispatch = useDispatch()
  const { me } = useSelector((state) => state.user)
  const { editCommentDone } = useSelector((state) => state.post)

  const [edit, setEdit] = useState(false)
  const onModify = useCallback(() => {
    setEdit(true)
  }, [])
  const onDelete = useCallback(
    (id) => (e) => {
      console.log(id)
      dispatch({
        type: REMOVE_COMMENT_REQUEST,
        data: { postId: currentPostId, commentId: id },
      })
    },
    [],
  )

  useEffect(() => {
    if (editCommentDone) {
      setEdit(false)
    }
  }, [editCommentDone])

  const myComment = (id) => me.id == id

  return (
    <List>
      {comments.map((v) => (
        <ListItem key={v.id} alignItems="flex-start" disableGutters>
          <ListItemAvatar>
            <ProfileAvatar alt={v.User.nickname} src={v.User.src} />
          </ListItemAvatar>
          {edit && myComment(v.UserId) ? (
            <CommentForm
              currentPostId={currentPostId}
              edit={edit}
              content={v.content}
              comment={v}
            />
          ) : (
            <div>
              <ListItemText primary={v.User.nickname} secondary={v.content} />
              {myComment(v.UserId) && (
                <>
                  <ButtonGroup variant="text">
                    <OptionButton onClick={onDelete(v.id)}>
                      <Delete fontSize="small" color="disabled" />
                    </OptionButton>
                    <OptionButton onClick={onModify}>
                      <Create fontSize="small" color="disabled" />
                    </OptionButton>
                  </ButtonGroup>
                </>
              )}
            </div>
          )}
        </ListItem>
      ))}
    </List>
  )
}

CommentList.propTypes = {
  currentPostId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
}
export default CommentList
