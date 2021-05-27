import styled from 'styled-components';

export const Header = styled.header`
    & .header__util-menu{
        position:absolute;
        right:0;
        top:0;
        display:flex;
    }

    & aside{
        position:fixed;
        right:0;
        top:0; 
        z-index:9;
        height:100%;
        background:#fff;
        transform:translateX(100%);
        transition:all .5s ease;
        
        &.is--open{
            transform:translateX(0);
        }
    }
`