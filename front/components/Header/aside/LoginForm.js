import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"

import { TextField } from "@material-ui/core"

import { LOG_IN_REQUEST } from "../../../reducers/user"
import { AsideInputField, ButtonPurple } from "../../../styles/style"

const LoginForm = ({ setAisdeToggle }) => {
  const { loginDone, loginError } = useSelector((state) => state.user)
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    console.log(data)
    dispatch({
      type: LOG_IN_REQUEST,
      data,
    })
    // dispatch(LoginRequestAction({ data }))
  }

  useEffect(() => {
    if (loginError) {
      alert(loginError)
    } else if (loginDone) {
      setAisdeToggle(false)
    }
  }, [loginError, loginDone])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AsideInputField>
        <TextField
          id="userid"
          label="아이디"
          {...register("userid")}
          fullWidth
          required
        />
      </AsideInputField>
      <AsideInputField>
        <TextField
          type="password"
          id="user-password"
          label="비밀번호"
          {...register("password")}
          fullWidth
          required
        />
      </AsideInputField>
      <ButtonPurple
        type="submit"
        xs={{
          width: "100%",
          height: "6rem",
          margin: "4rem 0 0",
        }}
      >
        로그인
      </ButtonPurple>
    </form>
  )
}

LoginForm.propTypes = {
  setAisdeToggle: PropTypes.func.isRequired,
}

export default LoginForm
