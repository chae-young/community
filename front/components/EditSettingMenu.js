import React, { useState, useCallback } from "react"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"

import { Menu, MenuItem, Button } from "@material-ui/core"
import { MoreVert } from "@material-ui/icons"

import styled from "styled-components"
import { REMOVE_POST_REQUEST } from "../reducers/post"

const EditMenu = styled.div`
  position: absolute;
  top: 5px;
  right: 0;
  z-index: 5;
  & button {
    min-width: 25px;
    min-height: 25px;
    padding: 0;
    border-radius: 100%;
  }
`
const EditSettingMenu = ({ id }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = useCallback((e) => {
    setAnchorEl(e.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const onDelete = useCallback(() => {
    alert("포스트를 삭제하시겠어요?")
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: id,
    })
    router.back()
  }, [])
  const onEdit = useCallback(() => {
    router.push({
      pathname: "../post/edit/[id]",
      query: { id },
    })
  }, [])

  return (
    <EditMenu>
      <Button
        aria-controls="setting-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert />
      </Button>
      <Menu
        id="setting-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={onEdit}>수정</MenuItem>
        <MenuItem onClick={onDelete}>삭제</MenuItem>
      </Menu>
    </EditMenu>
  )
}
export default EditSettingMenu
