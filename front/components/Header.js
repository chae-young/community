import React, { useState, useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import Link from "next/link"

import { Close, AccountCircleOutlined, Search } from "@material-ui/icons"
import { Avatar } from "@material-ui/core"

import styled from "styled-components"
import { HeaderUtillMenu, Aside, CloseBtn } from "../styles/style"
import LoginForm from "./LoginForm"
import Signup from "./Signup"
import MypopOver from "./MypopOver"

import SearchPopup from "./SearchPopup"

const Logo = styled.h1`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`
const HeaderWrap = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`
const InnerHeader = styled.div`
  position: relative;
  border-bottom:1px solid rgb(0,0,0);
  background: rgb(245 240 228 / 70%);
  backdrop-filter: blur(5px);
}
`
const Nav = styled.nav`
  overflow: hidden;
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

  const [searchopen, setSearchopen] = useState(false)
  const onSearch = useCallback(() => {
    setSearchopen(true)
  }, [])
  const onSearchClose = useCallback(() => {
    setSearchopen(false)
  }, [])

  return (
    <>
      <HeaderWrap>
        <InnerHeader>
          <Logo>
            <Link href="/">
              <a>MovieFeeds</a>
            </Link>
          </Logo>
          <Nav>
            <HeaderUtillMenu>
              <li>
                <Link href="/board">
                  <a>review</a>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  variant="contained"
                  onClick={loginOnClick}
                >
                  {me ? (
                    <Avatar
                      alt={me.nickname}
                      src={`http://localhost:3063/profile/${me.src}`}
                    />
                  ) : (
                    <AccountCircleOutlined fontSize="large" />
                  )}
                </button>
                {me && (
                  <MypopOver options={{ id, open, anchorEl, setAnchorEl }} />
                )}
              </li>
              <li>
                <button type="button" onClick={onSearch}>
                  <Search fontSize="large" />
                </button>
              </li>
            </HeaderUtillMenu>
          </Nav>
          <Aside toggle={loginOn}>
            <CloseBtn onClick={onClose}>
              <Close fontSize="large" />
            </CloseBtn>
            계정이 없으신가요?
            <button type="button" onClick={onToggle}>
              {isToggleOn ? "회원가입하기" : "로그인하기"}
            </button>
            {isToggleOn ? (
              <LoginForm setLoginOn={setLoginOn} />
            ) : (
              <Signup setLoginOn={setLoginOn} />
            )}
          </Aside>
        </InnerHeader>
      </HeaderWrap>
      <SearchPopup searchopen={searchopen} onSearchClose={onSearchClose} />
    </>
  )
}

export default Header
