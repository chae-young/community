import React, { useState, useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import Link from "next/link"

import { Search } from "@material-ui/icons"
import { Avatar } from "@material-ui/core"

import styled from "styled-components"
import { HeaderUtillMenu } from "../styles/style"
import MypopOver from "./MypopOver"
import UserImg from "../images/common/icon_user.png"
import SearchPopup from "./SearchPopup"
import HeaderAside from "./HeaderAside"

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
  z-index: 10;
  width: 100%;
  height: 65px;
`
const InnerHeader = styled.div`
  position: relative;
  padding:20px 0;
  border-bottom:1px solid rgb(0,0,0);
  background: rgb(245 240 228 / 70%);
  backdrop-filter: blur(5px);
}
`
const Nav = styled.nav`
  overflow: hidden;
`
const UserIcon = styled.i`
  width: 1.7rem;
  height: 1.7rem;
  background: url(${UserImg}) 0 0 / 100% no-repeat;
`

const Header = () => {
  const { me } = useSelector((state) => state.user)
  const [anchorEl, setAnchorEl] = useState(null)
  const [loginOn, setLoginOn] = useState(null)
  const loginOnClick = useCallback((e) => {
    if (me) {
      setLoginOn(false)
      setAnchorEl(e.currentTarget)
    } else {
      setLoginOn(true)
    }
  })

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
                  <a>REVIEW</a>
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
                    <UserIcon></UserIcon>
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
        </InnerHeader>
      </HeaderWrap>
      <HeaderAside loginOn={loginOn} setLoginOn={setLoginOn} />
      <SearchPopup searchopen={searchopen} onSearchClose={onSearchClose} />
    </>
  )
}

export default Header
