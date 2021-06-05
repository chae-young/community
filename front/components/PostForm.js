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
          'blockquote',
          'bold', 'underline', 'italic', 'strike',
          'fontColor', 'hiliteColor',
          'align', 'list', 'lineHeight',
          'table', 'link', 'image',]]
        }}
        onChange={handleChange}
      />
      <button onClick={onSubmit}><Link href="/"><a>등록</a></Link></button>
    </div>
  );
}

export default PostForm;