import React, { useCallback, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"

import TextField from "@material-ui/core/TextField"

import { SIGN_UP_REQUEST } from "../../../reducers/user"
import { AsideInputField, ButtonPurple } from "../../../styles/style"

const Signup = ({ setAisdeToggle }) => {
  const dispatch = useDispatch()
  const { signUpDone } = useSelector((state) => state.user)
  const [signupComplete, setSignupComplete] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (signupComplete) {
      alert("가입이 완료되었습니다")
    }
  }, [signupComplete])

  const onSubmit = useCallback(
    (data, e) => {
      dispatch({
        type: SIGN_UP_REQUEST,
        data,
      })
      if (signUpDone) {
        e.target.reset()
        setSignupComplete(true)
      }
      setAisdeToggle(false)
    },
    [signUpDone],
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
          {...register("userId")}
          fullWidth
          required
        />
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
