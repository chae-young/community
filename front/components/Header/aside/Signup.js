import React, { useCallback, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"

import { TextField } from "@material-ui/core"

import { SIGN_UP_REQUEST } from "../../../reducers/user"
import { AsideInputField, ButtonPurple } from "../../../styles/style"

const Signup = ({ setAisdeToggle }) => {
  const dispatch = useDispatch()
  const { signUpDone, signUpError } = useSelector((state) => state.user)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = useCallback(
    (data, e) => {
      dispatch({
        type: SIGN_UP_REQUEST,
        data,
      })
      if (signUpError) {
        alert(signUpError)
      }
      if (signUpDone) {
        e.target.reset()
        alert("가입이 완료되었습니다")
      }
    },
    [signUpDone, signUpError],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AsideInputField>
        <TextField
          id="name"
          label="이름"
          {...register("name")}
          fullWidth
          required
        />
      </AsideInputField>
      <AsideInputField>
        <TextField
          id="userId"
          label="아이디"
          {...register("userId", {
            pattern: /^[a-zA-Z0-9]*$/,
          })}
          fullWidth
          required
        />
        {errors?.userId?.type === "pattern" && (
          <p>영문과 숫자로 입력해주세요.</p>
        )}
      </AsideInputField>
      <AsideInputField>
        <TextField
          id="nickname"
          label="닉네임"
          {...register("nickname")}
          fullWidth
          required
        />
      </AsideInputField>
      <AsideInputField>
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
      </AsideInputField>
      <AsideInputField>
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
      </AsideInputField>
      <ButtonPurple
        type="submit"
        xs={{
          width: "100%",
          height: "6rem",
          margin: "4rem 0 0",
        }}
      >
        가입하기
      </ButtonPurple>
    </form>
  )
}

Signup.propTypes = {
  setAisdeToggle: PropTypes.func.isRequired,
}

export default Signup
