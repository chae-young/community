import React, { useCallback, useRef } from "react"
import { useForm } from "react-hook-form"

import { Avatar } from "@material-ui/core"

import ProfileLayout from "../../components/ProfileLayout"

const edit = () => {
  const { register, handleSubmit } = useForm()

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
      </form>
    </ProfileLayout>
  )
}
export default edit
