import React, { useCallback, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"

import { TextField, Button } from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"
import { LoginRequestAction } from "../reducers/user"

const useStyle = makeStyles((theme) => ({
  bg: {
    background: "rgb(249, 137, 15)",
    "&:hover": {
      background: "rgb(253, 206, 156)",
    },
  },
}))

const LoginForm = ({ setLoginOn }) => {
  const { me, loginError, loginLoading } = useSelector((state) => state.user)
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const classes = useStyle()

  const onSubmit = (data) => {
    dispatch(LoginRequestAction({ data }))
    setLoginOn(false)
  }
  useEffect(() => {
    if (loginError) {
      alert(loginError)
    } else {
      setLoginOn(false)
    }
  }, [loginError])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="aside__input-field">
        <TextField
          id="userid"
          label="아이디"
          {...register("userid")}
          fullWidth
          required
        />
      </div>
      <div className="aside__input-field">
        <TextField
          type="password"
          id="user-password"
          label="비밀번호"
          {...register("password")}
          fullWidth
          required
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        className={classes.bg}
      >
        로그인
      </Button>
    </form>
  )
}

LoginForm.propTypes = {
  setLoginOn: PropTypes.func.isRequired,
}

export default LoginForm
