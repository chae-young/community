import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"
import Link from "next/link"
import { useRouter } from "next/router"

import { Popover } from "@material-ui/core"

import styled from "styled-components"
import { LOG_OUT_REQUEST } from "../../reducers/user"
import ProfileAvatar from "../Profile/Avatar"

const MypopOver = ({ options }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { me } = useSelector((state) => state.user)

  const handleClose = useCallback(() => {
    options.setAnchorEl(null)
  }, [])
  const onLogout = useCallback(() => {
    dispatch({ type: LOG_OUT_REQUEST })
    router.replace("/")
    handleClose()
  }, [])
  return (
    <PopoverWrap
      id={options.id}
      open={options.open}
      anchorEl={options.anchorEl}
      onClose={handleClose}
    >
      <PopoverInner>
        <div>
          <ProfileAvatar src={me.src} alt={me.nickname} />
        </div>
        <PopoverInfo>
          <div className="profile-user">
            <Link href="/users/[id]" as={`/users/${me.id}`} prefetch={false}>
              <a>{me.nickname}</a>
            </Link>
            <span className="id">{me.userId}</span>
          </div>
          <Link href="/write">
            <a className="profile-write">글쓰기</a>
          </Link>
          <button type="button" onClick={onLogout}>
            로그아웃
          </button>
        </PopoverInfo>
      </PopoverInner>
    </PopoverWrap>
  )
}

const PopoverWrap = styled(Popover)`
  min-width: 140px;
  & .MuiPopover-paper {
    border: ${({ theme }) => theme.pointColor.border};
    background: ${({ theme }) => theme.pointColor.bg};
  }
`
const PopoverInner = styled.div`
  display: flex;
  padding: 1.5rem;
`
const PopoverInfo = styled.div`
  padding: 1rem;
  font-size: 1.2rem;
  & .profile-user {
    margin-bottom: 2em;
    & a {
      font-size: 1.3rem;
      font-weight: bold;
      color: rgb(0, 0, 0);
      &:hover {
        text-decoration: underline;
      }
    }
    & .id {
      margin-left: 0.5em;
      color: ${({ theme }) => theme.pointColor.gray};
    }
  }
  & button {
    margin-top: 0.5em;
    padding: 0;
    font-size: 1rem;
    color: ${({ theme }) => theme.pointColor.gray};
  }
`

MypopOver.defaultProps = {
  options: null,
}
MypopOver.propTypes = {
  options: PropTypes.shape({
    id: PropTypes.string,
    open: PropTypes.bool,
    anchorEl: null,
    setAnchorEl: PropTypes.func,
  }),
}

export default MypopOver
