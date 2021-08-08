/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import Router from "next/router"

import Rating from "@material-ui/lab/Rating"
import { makeStyles } from "@material-ui/core/styles"
import { Container, Grid } from "@material-ui/core"
import { Attachment } from "@material-ui/icons"
import styled from "styled-components"

import { ADD_POST_REQUEST, IMAGE_UPLOAD_REQUEST } from "../reducers/post"
import MovieSrhModal from "./MovieSrhModal"
import basicPoster from "../images/noimage.png"
import { InputStyle, StyledRating, ButtonStyle } from "../styles/style"

const useStyles = makeStyles((theme) => ({
  imgBox: {
    padding: "2rem",
    borderRight: "1px solid rgb(0,0,0)",
  },
  textBox: {
    padding: "6rem",
  },
  iconStyle: {
    padding: "0 0.5rem",
  },
}))

const PostFormImg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const PostFormImgBtn = styled.div`
  display: flex;
  width: 100%;
  margin-top: 2rem;

  & button {
    flex: 1;
    justify-content: center;
    font-size: 1.4rem;
    font-weigth: bold;
  }
`
const PostFormTit = styled.div``
const PostFormInput = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 15px;
  ${InputStyle}
`
const PostTextArea = styled.textarea`
  width: 100%;
  height: 50vh;
  margin-top: 2rem;
  padding: 2rem;
  overflow-y: auto;
  background: none;
  border: 1px solid rgb(0, 0, 0);
  box-sizing: border-box;
  resize: none;
`
const Button = styled.button`
  display: block;
  width: 100%;
  height: 65px;
  line-height: 65px;
  margin: 2em auto 0;
  text-align: center;
  ${ButtonStyle}

  &:hover {
    background: rgb(0, 0, 0);
  }
`

const PostForm = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { imagePath } = useSelector((state) => state.post)
  const { register, trigger, handleSubmit } = useForm()

  // 1이면 api 2이면 file
  const [selectedCheck, setSelectedCheck] = useState(null)

  const [rating, setRating] = useState(0.5)
  const onSubmit = useCallback(
    (data) => {
      const totalData = { ...data, imagePath, rating }
      const formData = new FormData()
      for (let key in totalData) {
        formData.append(key, totalData[key])
      }
      // FormData.append("title",title)
      // FormData.append("content",content)
      // FormData.append("rating",rating)
      // const { title, content } = data
      dispatch({
        type: ADD_POST_REQUEST,
        data: totalData,
      })
      Router.push("/board")
      window.scrollTo(0, 0)
    },
    [imagePath, rating],
  )

  const inputFile = useRef(null)
  const onFileUpload = () => {
    inputFile.current.click()
  }
  const onClickImage = (e) => {
    e.target.value = null
  }

  const onChangeImage = useCallback(
    (e) => {
      console.log("image", e.target.files[0])
      const imageFormData = new FormData()
      imageFormData.append("singleimage", e.target.files[0])
      dispatch({
        type: IMAGE_UPLOAD_REQUEST,
        data: imageFormData,
      })
      setSelectedCheck(2)
    },
    [imagePath],
  )

  const imgSrc = useCallback(() => {
    switch (selectedCheck) {
      case 1:
        return imagePath
      case 2:
        return `http://localhost:3063/${imagePath}`
      default:
        return basicPoster
    }
  }, [selectedCheck, imagePath])

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <Grid container>
        <Grid item xs={12} sm={6} className={classes.imgBox}>
          <PostFormImg>
            <div>
              <img src={imgSrc()} style={{ maxWidth: "100%" }} />
            </div>
            <PostFormImgBtn>
              <MovieSrhModal setSelectedCheck={setSelectedCheck} />
              <input
                type="file"
                ref={inputFile}
                style={{ display: "none" }}
                onChange={onChangeImage}
                onClick={onClickImage}
              />
              <button type="button" onClick={onFileUpload}>
                내 이미지
                <Attachment font-size="small" className={classes.iconStyle} />
              </button>
            </PostFormImgBtn>
          </PostFormImg>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.textBox}>
          <PostFormTit>
            <PostFormInput
              {...register("title", {
                required: true,
              })}
              placeholder="영화제목을 입력해주세요."
            />
            <StyledRating
              value={rating}
              precision={0.5}
              size="large"
              onChange={(_event, newValue) => {
                setRating(newValue)
              }}
            />
          </PostFormTit>
          <PostTextArea
            {...register("content", {
              required: true,
            })}
            placeholder="내용을 입력해주세요."
          />
          <Button
            type="submit"
            onClick={async () => {
              const titleVal = await trigger("title")
              const contentVal = await trigger("content")
              if (!titleVal) {
                alert("영화제목을 입력해주세요")
              } else if (!contentVal) {
                alert("내용을 입력해주세요")
              } else if (imgSrc() === basicPoster) {
                alert("사진을 등록해주세요")
              }
            }}
          >
            등록
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default PostForm

{
  /* // import React, { useCallback, useState} from 'react';
// import TextField from '@material-ui/core/TextField';
// import Link from 'next/link';
// import dynamic from 'next/dynamic';
// import 'suneditor/dist/css/suneditor.min.css';
// import { useDispatch } from 'react-redux';
// import { ADD_POST_REQUEST } from '../reducers/post';

// const SunEditor = dynamic(() => import('suneditor-react'), {
//   ssr: false,
// }); */
}
{
  /* 
// const PostForm = () => { */
}
{
  /* //   const dispatch = useDispatch();

//   const [boardTitle, setBoardTitle] = useState('');
//   const [boardText, setBoardText] = useState('');

//   const onChangeTitle = useCallback((e) => {
//     setBoardTitle(e.target.value);
//   }, [boardTitle]);

//   const onSubmit = useCallback(() => {
//     dispatch({
//       type: ADD_POST_REQUEST,
//       data: {content: boardText, title: boardTitle},
//     });
//   }, [boardTitle, boardText]);

//   const handleonBlur = (event, editorContents) => {
//     setBoardText(editorContents);
//     console.log(event, editorContents);
//   };

//   return (
//     <div>
//         <TextField
//           placeholder="제목을 입력해주세요"
//           fullWidth
//           value={boardTitle}
//           onChange={onChangeTitle}
//         />
//       <SunEditor
//         lang="ko"
//         height="50vh"
//         setOptions={{
//           buttonList: [
//           ['undo', 'redo',
//           'font', 'fontSize', 'formatBlock',
//           'blockquote',
//           'bold', 'underline', 'italic', 'strike',
//           'fontColor', 'hiliteColor',
//           'align', 'list', 'lineHeight',
//           'table', 'link', 'image']],
//         }}
//         onBlur={handleonBlur}
//       />
//       <button type="button" onClick={onSubmit}><Link href="/board"><a>등록</a></Link></button>
//     </div>
//   );
// };

// export default PostForm; */
}
