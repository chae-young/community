import React, { useCallback, useState} from 'react';
import TextField from '@material-ui/core/TextField';
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

  const [boardTitle, setBoardTitle] = useState('');
  const [boardText, setBoardText] = useState('');

  const onChangeTitle = useCallback((e) => {
    setBoardTitle(e.target.value);
  }, [boardTitle]);
  
  const onSubmit = useCallback(() => {
    dispatch({
      type: ADD_POST_REQUEST,
      data: {content: boardText, title: boardTitle},
    });
  }, [boardTitle, boardText]);

  const handleonBlur = (event, editorContents) => {
    setBoardText(editorContents);
    console.log(event, editorContents);
  };

  return (
    <div>
        <TextField
          placeholder="제목을 입력해주세요"
          fullWidth
          value={boardTitle}
          onChange={onChangeTitle}
        />
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
        onBlur={handleonBlur}
      />
      <button type="button" onClick={onSubmit}><Link href="/board"><a>등록</a></Link></button>
    </div>
  );
};

export default PostForm;
