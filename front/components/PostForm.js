/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"

import Rating from "@material-ui/lab/Rating"
import Container from "@material-ui/core/Container"
import styled, { ThemeProvider } from "styled-components"
import faker from "faker"

import { addPostReuestAction } from "../reducers/post"
import MovieSrhModal from "./MovieSrhModal"

const PostFormHead = styled.div`
  display: flex;
  padding: 2rem 0;
`
const PostFormImg = styled.div`
  flex: 3;
`
const PostFormImgBtn = styled.div`
  display: flex;
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
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const [selectedIndex, setSelectedIndex] = useState(1)
  const [selectedCheck, setSelectedCheck] = useState(false)
  const handleListItemClick = (event, index) => {
    console.log(index)
    setSelectedCheck(true)
    setSelectedIndex(index)
  }

  const [imgSrc, setImgSrc] = useState("")
  const [rating, setRating] = useState(0.5)
  const onSubmit = useCallback((data) => {
    console.log(rating, data)
    const { title, content } = data
    dispatch(addPostReuestAction({ rating, imgSrc, title, content }))
    // Router.push("/board")
  }, [])

  const inputFile = useRef(null)
  const onFileUpload = () => {
    inputFile.current.click()
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <PostFormHead>
            <PostFormImg>
              <div>
                <img
                  src={selectedCheck && movieSrhList[selectedIndex].image}
                  width="100%"
                />
              </div>
              <PostFormImgBtn>
                <MovieSrhModal
                  selectedIndex={selectedIndex}
                  handleListItemClick={handleListItemClick}
                />
                <input
                  type="file"
                  ref={inputFile}
                  style={{ display: "none" }}
                />
                <button type="button" onClick={onFileUpload}>
                  내 이미지 가져오기
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

          <Button type="submit">등록</Button>
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
