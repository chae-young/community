import React, { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"

import { makeStyles } from "@material-ui/core/styles"
import { TextField, Button } from "@material-ui/core"

import { SIGN_UP_REQUEST } from "../reducers/user"
import { useEffect } from "react"

const useStyle = makeStyles((theme) => ({
  bg: {
    background: "red",
  },
}))

const Signup = ({ setLoginOn }) => {
  const classes = useStyle()
  const dispatch = useDispatch()
  const { signUpDone } = useSelector((state) => state.user)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (signUpDone) {
      alert("가입이 완료되었습니다")
    }
  }, [signUpDone])

  const onSubmit = useCallback((data) => {
    console.log(data)
    dispatch({
      type: SIGN_UP_REQUEST,
      data,
    })
    setLoginOn(false)
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="aside__input-field">
        <TextField
          id="name"
          label="이름"
          {...register("name")}
          fullWidth
          required
        />
      </div>
      <div className="aside__input-field">
        <TextField
          id="userId"
          label="아이디"
          {...register("userId")}
          fullWidth
          required
        />
      </div>
      <div className="aside__input-field">
        <TextField
          id="nickname"
          label="닉네임"
          {...register("nickname")}
          fullWidth
          required
        />
      </div>
      <div className="aside__input-field">
        <TextField
          type="password"
          id="password"
          label="비밀번호"
          {...register("password", {
            minLength: 8,
          })}
          fullWidth
          required
        />
        {errors?.password?.type === "minLength" && (
          <p>비밀번호 8자 이상으로 입력해주세요.</p>
        )}
      </div>
      <div className="aside__input-field">
        <TextField
          type="password"
          id="password-check"
          label="비밀번호 확인"
          {...register("passwordCheck", {
            validate: (value) => value === watch("password"),
          })}
          fullWidth
          required
        />
        {errors?.passwordCheck?.type === "validate" && (
          <p>비밀번호가 틀립니다.</p>
        )}
      </div>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        className={classes.bg}
      >
        가입하기
      </Button>
    </form>
  )
}

Signup.propTypes = {
  setLoginOn: PropTypes.func.isRequired,
}

export default Signup
