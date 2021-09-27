import React, { useState, useCallback } from "react"
import PropTypes from "prop-types"
import dynamic from "next/dynamic"

import { Close } from "@material-ui/icons"

import styled from "styled-components"
import LoginForm from "./LoginForm"
const Signup = dynamic(() => import("./Signup"))
import { CloseBtn } from "../../../styles/style"

const HeaderAside = ({ aisdeToggle, setAisdeToggle }) => {
  const [isToggleOn, setIsToggleOn] = useState(true)
  const onToggle = useCallback((e) => {
    setIsToggleOn((prev) => !prev)
  }, [])

  const onClose = useCallback(() => {
    setAisdeToggle(false)
  }, [])

  return (
    <Aside toggle={aisdeToggle}>
      <h3>{isToggleOn ? "Login" : "Join"}</h3>
      <CloseBtn onClick={onClose}>
        <Close fontSize="large" />
      </CloseBtn>
      <LoginToggle>
        계정이 없으신가요?
        <button type="button" onClick={onToggle}>
          {isToggleOn ? "회원가입하기" : "로그인하기"}
        </button>
      </LoginToggle>
      {isToggleOn ? (
        <LoginForm setAisdeToggle={setAisdeToggle} />
      ) : (
        <Signup setAisdeToggle={setAisdeToggle} />
      )}
    </Aside>
  )
}
const Aside = styled.aside`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 11;
  width: 30vw;
  height: 100%;
  padding: 4rem 2rem 0;
  border-left: ${({ theme }) => theme.pointColor.border};
  background: ${({ theme }) => theme.pointColor.bg};
  transform: ${(props) =>
    props.toggle ? "translateX(0)" : "translateX(100%)"};
  transition: all 0.5s ease;
  box-sizing: border-box;

  @media ${({ theme }) => theme.device.mobile} {
    width: 90vw;
  }
  > h3 {
    margin-bottom: 5rem;
    font-size: 2.7rem;
  }
`
const LoginToggle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  & button {
    font-size: 1.2rem;
    margin-left: 1rem;
  }
`
HeaderAside.propTypes = {
  aisdeToggle: PropTypes.bool.isRequired,
  setAisdeToggle: PropTypes.func.isRequired,
}
export default HeaderAside
