/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState, useRef } from "react"
import { useForm } from "react-hook-form"
import Rating from "@material-ui/lab/Rating"
import { useDispatch } from "react-redux"
import Router from "next/router"
import styled from "styled-components"

import faker from "faker"
import { addPostReuestAction } from "../reducers/post"

const PostFormHead = styled.div`
  display: flex;
`
const PostFormImg = styled.div`
  > div {
    width: 20%;
  }
`
const PostFormImgBtn = styled.div`
  display: flex;
`
const PostFormTit = styled.div``

const PostForm = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [imgSrc, setImgSrc] = useState("")
  const [rating, setRating] = useState(0.5)

  const onSubmit = useCallback((data) => {
    console.log(rating, data)
    const { title, content } = data
    dispatch(addPostReuestAction({ rating, imgSrc, title, content }))
    Router.push("/board")
  }, [])

  const inputFile = useRef(null)
  const onFileUpload = () => {
    inputFile.current.click()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PostFormHead>
        <PostFormImg>
          <div>
            <img src={faker.image.image()} width="100%" />
          </div>
          <PostFormImgBtn>
            <button type="button">이미지 검색하기</button>
            <input type="file" ref={inputFile} style={{ display: "none" }} />
            <button type="button" onClick={onFileUpload}>
              내 이미지 가져오기
            </button>
          </PostFormImgBtn>
        </PostFormImg>
        <PostFormTit>
          <input {...register("title")} />
          <Rating
            value={rating}
            precision={0.5}
            onChange={(_event, newValue) => {
              setRating(newValue)
            }}
          />
        </PostFormTit>
      </PostFormHead>
      <textarea {...register("content")} />
      <button type="submit">등록</button>
    </form>
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
