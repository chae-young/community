import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"
import Link from "next/link"

import { Popover, Avatar } from "@material-ui/core"

import {
  PopoverWrap,
  PopoverProfile,
  PopoverInfo,
  PopoverBtn,
} from "../styles/style"
import { LOG_OUT_REQUEST } from "../reducers/user"

const MypopOver = ({ options }) => {
  const dispatch = useDispatch()
  const { me } = useSelector((state) => state.user)

  const handleClose = () => {
    options.setAnchorEl(null)
  }
  const onLogout = useCallback(() => {
    dispatch({ type: LOG_OUT_REQUEST })
    handleClose()
  })
  return (
    <Popover
      id={options.id}
      open={options.open}
      anchorEl={options.anchorEl}
      onClose={handleClose}
    >
      <PopoverWrap>
        <PopoverProfile>
          <div className="profile__img">
            <Avatar alt="내 프로필 사진" src="" width="10%" />
          </div>
          <PopoverInfo>
            <Link href="/profile">
              <a className="profile-nick">{me.nickname}</a>
            </Link>
            <Link href="/write">
              <a className="profile-write">글쓰기</a>
            </Link>
            <span className="id">{me.userId}</span>
            <button onClick={onLogout}>로그아웃</button>
          </PopoverInfo>
        </PopoverProfile>
      </PopoverWrap>
    </Popover>
  )
}
MypopOver.defaultProps = {
  options: null,
}
MypopOver.propTypes = {
  options: PropTypes.shape({
    id: PropTypes.string,
    open: PropTypes.bool,
    anchorEl: PropTypes.bool,
    setAnchorEl: PropTypes.bool,
  }),
}

export default MypopOver
