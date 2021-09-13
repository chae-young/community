import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import { headerHeight } from "./style"

const GlobalStyle = createGlobalStyle`
    ${reset}
    html,body{
        padding: 0;
        margin: 0;
        font-family:-apple-system, BlinkMacSystemFont, "Noto Sans KR", Roboto, "Segoe UI", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";   
        font-size:10px;
    };
    body{
        padding-top:${headerHeight};
        line-height: 1.5;
        background:#f5f0e4;        
    }
    button{
        display: flex;
        cursor: pointer;
        outline: none;
        background:none;
        border:0;
        padding:0;
    };
    input{
        display: flex;
        outline: none;
        padding-left: 10px;
    }
    a{
        text-decoration:none;
        color:rgb(0,0,0);
    }
    li{
        list-style:none;
    }
`
export default GlobalStyle
