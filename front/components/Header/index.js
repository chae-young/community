import React, { useState, useCallback, useRef } from "react"
import Image from "next/image"
import { useSelector } from "react-redux"
import Link from "next/link"
import dynamic from "next/dynamic"

import { Search } from "@material-ui/icons"

import styled from "styled-components"
import LogoImg from "../../public/images/logo.png"
const HeaderUserPopover = dynamic(() => import("./HeaderUserPopover"))
const SearchPopup = dynamic(() => import("../Search"))
const HeaderAside = dynamic(() => import("./aside"))
import UserImg from "./images/icon_user.png"
import { headerHeight } from "../../styles/style"
import ProfileAvatar from "../Profile/Avatar"

const Header = () => {
  const { me } = useSelector((state) => state.user)
  const header = useRef(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [aisdeToggle, setAisdeToggle] = useState(false)

  const userIconClick = useCallback((e) => {
    if (me) {
      setAisdeToggle(false)
      setAnchorEl(e.currentTarget)
    } else {
      setAisdeToggle(true)
    }
  })

  const open = Boolean(anchorEl)
  const id = open ? "user-popover" : undefined

  const [searchopen, setSearchopen] = useState(false)
  const onSearch = useCallback(() => {
    setSearchopen(true)
  }, [])
  const onSearchClose = useCallback(() => {
    setSearchopen(false)
  }, [])

  return (
    <>
      <HeaderWrap ref={header}>
        <InnerHeader>
          <Logo>
            <Link href="/">
              <a>
                <Image src={LogoImg} alt="emotion" layout="fill" />
              </a>
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
                <button type="button" onClick={userIconClick}>
                  {me ? (
                    <ProfileAvatar src={me.src} alt={me.nickname} />
                  ) : (
                    <UserIcon />
                  )}
                </button>
                {me && (
                  <HeaderUserPopover
                    options={{ id, open, anchorEl, setAnchorEl }}
                  />
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
      <HeaderAside aisdeToggle={aisdeToggle} setAisdeToggle={setAisdeToggle} />
      <SearchPopup searchopen={searchopen} onSearchClose={onSearchClose} />
    </>
  )
}

const Logo = styled.h1`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  > a {
    display: block;
    width: 130px;
    height: 31px;
  }
`
const HeaderWrap = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: ${headerHeight}px;
`
const InnerHeader = styled.div`
  position: relative;
  height: 100%;  
  padding:0 2rem;
  border-bottom:1px solid rgb(0,0,0);
  background: rgb(245 240 228 / 70%);
  backdrop-filter: blur(5px);
}
`
const Nav = styled.nav`
  height: 100%;
  overflow: hidden;
`
const HeaderUtillMenu = styled.ul`
  float: right;
  display: flex;
  height: 100%;
  align-items: center;
  font-size: 1.2rem;
  > li:first-child {
    padding: 0 2rem;
    font-weight: bold;

    @media ${({ theme }) => theme.device.mobile} {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  & li + li {
    margin: 0 0 0 1rem;
  }
`
const UserIcon = styled.i`
  width: 1.7rem;
  height: 1.7rem;
  background: url(${UserImg}) 0 0 / 100% no-repeat;
`

export default Header
