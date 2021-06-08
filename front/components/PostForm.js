import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css';
import { useDispatch } from 'react-redux';
import { ADD_POST_REQUEST } from '../reducers/post';

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});

const PostForm = () => {
  const dispatch = useDispatch();

  const handleChange = (content) => {
    console.log(content);
    dispatch({
      type: ADD_POST_REQUEST,
      data: content,
    });
  };

  return (
    <div>
      <SunEditor
        lang="ko"
        height="50vh"
        setOptions={{
          buttonList: [
          ['undo', 'redo',
          'font', 'fontSize', 'formatBlock',
          'blockquote',
          'bold', 'underline', 'italic', 'strike',
          'fontColor', 'hiliteColor',
          'align', 'list', 'lineHeight',
          'table', 'link', 'image']],
        }}
        onChange={handleChange}
      />
      <button type="button"><Link href="/board"><a>등록</a></Link></button>
    </div>
  );
};

export default PostForm;
