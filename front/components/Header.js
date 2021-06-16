import React, { useState, useCallback, useEffect } from "react"
import { UserOutlined, SearchOutlined } from "@ant-design/icons"
import Link from "next/link"
import Avatar from "@material-ui/core/Avatar"
import { useSelector } from "react-redux"
import { HeaderUtillMenu, Aside } from "../styles/style"
import LoginForm from "./LoginForm"
import Signup from "./Signup"
import MypopOver from "./MypopOver"

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
      return
    }
    setLoginOn(true)
  })

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  return (
    <header>
      <h1>
        <Link href="/">
          <a>MovieHome</a>
        </Link>
      </h1>
      <nav>
        <HeaderUtillMenu>
          <li>
            <button type="button" variant="contained" onClick={loginOnClick}>
              {me ? "내프로필사진예정" : <UserOutlined />}
            </button>
            {me && <MypopOver options={{ id, open, anchorEl, setAnchorEl }} />}
          </li>
          <li>
            <button type="button">
              <SearchOutlined />
            </button>
          </li>
        </HeaderUtillMenu>
      </nav>
      <Aside toggle={loginOn}>
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
