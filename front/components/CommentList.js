import React, { useState } from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"

import { makeStyles } from "@material-ui/core/styles"
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core"

const CommentList = ({ id }) => {
  const { postList } = useSelector((state) => state.post)
  return (
    <List>
      {postList
        .find((v) => v.id === id)
        .Comments.map((v) => (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={v.User.nickname} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText primary={v.User.nickname} secondary={v.content} />
          </ListItem>
        ))}
    </List>
  )
}

CommentList.propTypes = {
  id: PropTypes.string.isRequired,
}
export default CommentList
