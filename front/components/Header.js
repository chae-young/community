import React, { useState, useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import Link from "next/link"

import { Close, AccountCircleOutlined, Search } from '@material-ui/icons';
import Avatar from "@material-ui/core/Avatar"
import styled from "styled-components"

import { HeaderUtillMenu, Aside } from "../styles/style"
import LoginForm from "./LoginForm"
import Signup from "./Signup"
import MypopOver from "./MypopOver"

const Logo = styled.h1`
  display: flex;
  justify-content: center;
`
const CloseBtn = styled.button`
  position: absolute;
  right: 0;
  top: 0;
`

const Header = () => {
  const { me } = useSelector((state) => state.user)

  const [isToggleOn, setIsToggleOn] = useState(true)
  const onToggle = useCallback(() => {
    setIsToggleOn((prev) => !prev)
  }, [isToggleOn])

  const [loginOn, setLoginOn] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const loginOnClick = useCallback((e) => {
    if (me) {
      setLoginOn(false)
      setAnchorEl(e.currentTarget)
      //return
    } else {
      setLoginOn(true)
    }
  })

  const onClose = useCallback(() => {
    setLoginOn(false)
  }, [])

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  return (
    <header>
      <Logo>
        <Link href="/">
          <a>MovieFeeds</a>
        </Link>
      </Logo>
      <nav>
        <HeaderUtillMenu>
          <li>
            <button type="button" variant="contained" onClick={loginOnClick}>
              {me ? "내프로필사진예정" : <AccountCircleOutlined fontSize="large" />}
            </button>
            {me && <MypopOver options={{ id, open, anchorEl, setAnchorEl }} />}
          </li>
          <li>
            <button type="button">
              <Search fontSize="large" />
            </button>
          </li>
        </HeaderUtillMenu>
      </nav>
      <Aside toggle={loginOn}>
        <CloseBtn onClick={onClose}><Close fontSize="large" /></CloseBtn>
        계정이 없으신가요?
        <button type="button" onClick={onToggle}>
          {isToggleOn ? "회원가입하기" : "로그인하기"}
        </button>
        {isToggleOn ? <LoginForm setLoginOn={setLoginOn} /> : <Signup />}
      </Aside>
    </header>
  )
}

export default Header
