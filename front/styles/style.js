import styled from 'styled-components';

export const Container = styled.section`
    max-width:1440px;
    margin:0 auto;
`
export const HeaderUtillMenu = styled.ul`
    position:absolute;
    right:0;
    top:0;
    display:flex;
`
export const Aside = styled.aside`
    position:fixed;
    right:0;
    top:0; 
    z-index:9;
    width:50vw;
    height:100%;
    padding:2rem;
    background:#fff;
    transform:${props=>(props.toggle ? 'translateX(0)': 'translateX(100%)')};
    transition:all .5s ease;
    box-sizing:border-box;
`
export const ErrorMsg = styled.div`
    color:red;
`

export const PopoverWrap = styled.div`
    padding:2rem;
`
export const PopoverProfile = styled.div`
    display:flex;

`
export const PopoverBtn = styled.div`
    display:flex;
`
export const PopoverInfo = styled.div`
    padding:1rem;
    & .nick{
        text-decoration:none;
        font-size:1.4rem;
        font-weight:bold;
        color:rgb(0,0,0);
        &:hover{
            text-decoration:underline;            
        }
    }
    & .id{
        display:block;
        margin-top:10px;
        font-size:1.2rem;
        color:rgb(102,102,102)
    }
`