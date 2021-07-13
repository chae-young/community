import React, { useCallback, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"

import { Avatar, TextField, Button } from "@material-ui/core"

import ProfileLayout from "../../components/ProfileLayout"
import {
  LOAD_USER_REQUEST,
  PROFILE_EDIT_REQUEST,
  PROFILE_IMG_REQUEST,
} from "../../reducers/user"

const edit = () => {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const { me } = useSelector((state) => state.user)

  const inputFile = useRef(null)
  const onFileUpload = () => {
    inputFile.current.click()
  }
  const onClickImage = (e) => {
    e.target.value = null
  }
  const onSubmit = useCallback(
    (data) => {
      const formData = new FormData()
      console.log(me.Image, data.nickname)
      formData.append("nickname", data.nickname)
      formData.append("image", me.Image)

      dispatch({
        type: PROFILE_EDIT_REQUEST,
        data: formData,
      })
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1])
      }
    },
    [me.Image],
  )
  const onChangeImage = useCallback((e) => {
    const imageFormData = new FormData()
    imageFormData.append("singleimage", e.target.files[0])
    dispatch({
      type: PROFILE_IMG_REQUEST,
      data: imageFormData,
    })
  }, [])

  return (
    <ProfileLayout>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <button type="button" onClick={onFileUpload}>
          <Avatar
            alt="내 프로필 사진"
            src={`http://localhost:3063/profile/${me.Image}`}
            width="10%"
          />
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
          defaultValue={me.nickname}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          저장
        </Button>
      </form>
    </ProfileLayout>
  )
}
export default edit
