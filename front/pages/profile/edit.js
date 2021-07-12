import React, { useCallback, useRef } from "react"
import { useForm } from "react-hook-form"

import { Avatar, TextField, Button } from "@material-ui/core"

import ProfileLayout from "../../components/ProfileLayout"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { LOAD_USER_REQUEST } from "../../reducers/user"

const edit = () => {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()

  const inputFile = useRef(null)
  const onFileUpload = () => {
    inputFile.current.click()
  }
  const onClickImage = (e) => {
    e.target.value = null
  }
  const onSubmit = useCallback((data) => {}, [])
  const onChangeImage = useCallback(() => {}, [])

  return (
    <ProfileLayout>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <button type="button" onClick={onFileUpload}>
          <Avatar alt="내 프로필 사진" src="" width="10%" />
        </button>
        <input
          type="file"
          ref={inputFile}
          style={{ display: "none" }}
          onChange={onChangeImage}
          onClick={onClickImage}
        />
        <TextField
          id="nickname"
          label="닉네임"
          {...register("nickname")}
          fullWidth
          required
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          저장
        </Button>
      </form>
    </ProfileLayout>
  )
}
export default edit
