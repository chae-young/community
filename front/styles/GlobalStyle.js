import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

const GlobalStyle = createGlobalStyle`
    ${reset};
    html,body{
        padding: 0;
        margin: 0;
        font-size:10px;
    };
    button{
        display: flex;
        cursor: pointer;
        outline: none;
        border-radius: 3px;
        background:none;
        border:0;
    };
    input{
        display: flex;
        outline: none;
        padding-left: 10px;
    }
`
export default GlobalStyle
