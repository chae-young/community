/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"

import Rating from "@material-ui/lab/Rating"
import Container from "@material-ui/core/Container"
import { Attachment } from "@material-ui/icons"
import styled, { ThemeProvider } from "styled-components"

import { ADD_POST_REQUEST, IMAGE_UPLOAD_REQUEST } from "../reducers/post"
import MovieSrhModal from "./MovieSrhModal"
import basicPoster from "../images/noimage.png"

const PostFormHead = styled.div`
  display: flex;
  padding: 2rem 0;
`
const PostFormImg = styled.div`
  flex: 3;
`
const PostFormImgBtn = styled.div`
  display: flex;
  & button {
    flex: 1;
    justify-content: center;
    font-size: 1.2rem;
  }
`
const PostFormTit = styled.div`
  flex: 7;
  padding: 0 2rem;
`
const PostFormInput = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 15px;
  border: ${(props) => props.theme.border};
`
const PostTextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 2rem;
  box-sizing: border-box;
  resize: none;
  border: ${(props) => props.theme.border};
`
const Button = styled.button`
  display: block;
  width: 150px;
  height: 40px;
  line-height: 40px;
  margin: 2em auto 0;
  text-align: center;
  border: ${(props) => props.theme.border};
`
export const theme = {
  border: "1px solid #d7d7d7",
}

const PostForm = () => {
  const dispatch = useDispatch()
  const { movieSrhList } = useSelector((state) => state.movie)
  const { imagePath } = useSelector((state) => state.post)
  const { register, errors, trigger, handleSubmit } = useForm()

  const [selectedIndex, setSelectedIndex] = useState(0)
  // 2이면 api 2이면 file
  const [selectedCheck, setSelectedCheck] = useState(null)

  const [rating, setRating] = useState(0.5)
  const onSubmit = useCallback((data) => {
    if (imgSrc() === basicPoster) {
      return alert("사진을 등록해주세요")
    }
    console.log(data, watch("title"), "데이터")
    // const FormData = new FormData()
    // FormData.append("image",imagePath)
    // FormData.append("title",title)
    // FormData.append("content",content)
    // FormData.append("rating",rating)
    // const { title, content } = data
    // dispatch({
    //   type: ADD_POST_REQUEST,
    //   data: { title, content ,imagePath, rating},
    // })
    // Router.push("/board")
  }, [])

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
      setSelectedCheck(1)
    },
    [imagePath],
  )

  const imgSrc = () => {
    switch (selectedCheck) {
      case 1:
        return imagePath
      case 2:
        return `http://localhost:3063/${imagePath}`
      default:
        return basicPoster
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <PostFormHead>
            <PostFormImg>
              <div>
                <img src={imgSrc()} width="100%" />
              </div>
              <PostFormImgBtn>
                <MovieSrhModal
                  setSelectedIndex={setSelectedIndex}
                  setSelectedCheck={setSelectedCheck}
                />
                <input
                  type="file"
                  ref={inputFile}
                  style={{ display: "none" }}
                  onChange={onChangeImage}
                  onClick={onClickImage}
                />
                <button type="button" onClick={onFileUpload}>
                  내 이미지 <Attachment font-size="small" />
                </button>
              </PostFormImgBtn>
            </PostFormImg>
            <PostFormTit>
              <PostFormInput
                {...register("title", {
                  required: true,
                })}
                placeholder="제목을 입력해주세요."
              />
              <Rating
                value={rating}
                precision={0.5}
                size="large"
                onChange={(_event, newValue) => {
                  setRating(newValue)
                }}
              />
            </PostFormTit>
          </PostFormHead>
          <PostTextArea
            {...register("content", {
              required: true,
            })}
          />
          <Button
            type="submit"
            onClick={async () => {
              const titleVal = await trigger("title")
              const contentVal = await trigger("content")
              if (!titleVal) {
                alert("제목을 입력해주세요")
              } else if (!contentVal) {
                alert("내용을 입력해주세요")
              }
            }}
          >
            등록
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  )
}

export default PostForm

// import React, { useCallback, useState} from 'react';
// import TextField from '@material-ui/core/TextField';
// import Link from 'next/link';
// import dynamic from 'next/dynamic';
// import 'suneditor/dist/css/suneditor.min.css';
// import { useDispatch } from 'react-redux';
// import { ADD_POST_REQUEST } from '../reducers/post';

// const SunEditor = dynamic(() => import('suneditor-react'), {
//   ssr: false,
// });

// const PostForm = () => {
//   const dispatch = useDispatch();

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

// export default PostForm;
