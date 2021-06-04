import {useState} from 'react';
import Link from 'next/link';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});
const handleChange = (content)=>{
	console.log(content); 
}
const onSubmit = ()=>{

}

const PostForm = ()=>{
  return (
    <div>
      <SunEditor 
        lang="ko"
        height="50vh"    
        setOptions={{
          buttonList:[
          ['undo', 'redo',
          'font', 'fontSize', 'formatBlock',
          'paragraphStyle', 'blockquote',
          'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript',
          'fontColor', 'hiliteColor', 'textStyle',
          'removeFormat',
          'outdent', 'indent',
          'align', 'horizontalRule', 'list', 'lineHeight',
          'table', 'link', 'image', 'video', 'audio',
          'fullScreen', 'showBlocks', 'codeView',
          'preview', 'print', 'save', 'template']]
        }}
        onChange={handleChange}
      />
      <button onClick={onSubmit}><Link href="/"><a>등록</a></Link></button>
    </div>
  );
}

export default PostForm;