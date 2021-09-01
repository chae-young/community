import React, { useCallback, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { END } from "redux-saga"
import axios from "axios"

import { TextField } from "@material-ui/core"

import styled from "styled-components"
import {
  LOAD_USER_REQUEST,
  PROFILE_EDIT_REQUEST,
  PROFILE_IMG_REQUEST,
  USER_INFO_REQUEST,
} from "../../../reducers/user"
import wrapper from "../../../store/configureStore"
import { AvatarSize, ButtonPurple, minContainer } from "../../../styles/style"
import Layout from "../../../components/Layout"

const EditForm = styled.div`
  ${minContainer}
`
const EditInput = styled.div`
  max-width: 280px;
  margin: auto;
`
const edit = () => {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const { me, userInfo } = useSelector((state) => state.user)

  const inputFile = useRef(null)
  const onFileUpload = () => {
    inputFile.current.click()
  }
  const onClickImage = (e) => {
    e.target.value = null
  }
  const onSubmit = (data) => {
    const editFormData = new FormData()
    editFormData.append("nickname", data.nickname)
    editFormData.append("image", me.src)
    console.log(data.nickname, me.Image)
    dispatch({
      type: PROFILE_EDIT_REQUEST,
      data: editFormData,
    })
  }

  const onChangeImage = useCallback((e) => {
    const imageFormData = new FormData()
    imageFormData.append("singleimage", e.target.files[0])
    dispatch({
      type: PROFILE_IMG_REQUEST,
      data: imageFormData,
    })
  }, [])

  return (
    <Layout>
      <EditForm>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <AvatarSize
            alt={me.nickname}
            onClick={onFileUpload}
            src={`http://localhost:3063/profile/${me.src}`}
          />
          <input
            type="file"
            ref={inputFile}
            style={{ display: "none" }}
            onChange={onChangeImage}
            onClick={onClickImage}
          />
          <EditInput>
            <TextField
              id="nickname"
              label="닉네임"
              {...register("nickname")}
              fullWidth
              defaultValue={me.nickname}
            />
            <ButtonPurple
              type="submit"
              style={{
                width: "100%",
                height: "40px",
                margin: "2rem auto 0",
              }}
            >
              저장
            </ButtonPurple>
          </EditInput>
        </form>
      </EditForm>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : ""
    axios.defaults.headers.Cookie = ""
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie
    }
    context.store.dispatch({
      type: LOAD_USER_REQUEST,
    })
    context.store.dispatch({
      type: USER_INFO_REQUEST,
      data: context.params.id,
    })
    context.store.dispatch(END)
    await context.store.sagaTask.toPromise()
    return { props: {} }
  },
)

export default edit
