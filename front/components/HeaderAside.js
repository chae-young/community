import React, { useState, useCallback, useEffect } from "react"
import PropTypes from "prop-types"

import { Close } from "@material-ui/icons"

import styled from "styled-components"
import LoginForm from "./LoginForm"
import Signup from "./Signup"
import { CloseBtn } from "../styles/style"

const Aside = styled.aside`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 11;
  width: 30vw;
  height: 100%;
  padding: 2rem;
  border-left: ${({ theme }) => theme.pointColor.border};
  background: ${({ theme }) => theme.pointColor.bg};
  transform: ${(props) =>
    props.toggle ? "translateX(0)" : "translateX(100%)"};
  transition: all 0.5s ease;
  box-sizing: border-box;
`

const HeaderAside = ({ loginOn, setLoginOn }) => {
  const [isToggleOn, setIsToggleOn] = useState(true)
  const onToggle = useCallback(() => {
    setIsToggleOn((prev) => !prev)
  }, [isToggleOn])

  const onClose = useCallback(() => {
    setLoginOn(false)
  }, [])

  return (
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
  )
}
HeaderAside.propTypes = {
  loginOn: PropTypes.bool.isRequired,
  setLoginOn: PropTypes.bool.isRequired,
}
export default HeaderAside
