import styled from 'styled-components';

export const HeaderWrap = styled.header`
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
        width:50vw;
        height:100%;
        padding:2rem;
        background:#fff;
        transform:translateX(100%);
        transition:all .5s ease;
        box-sizing:border-box;
        
        &.is--open{
            transform:translateX(0);
        }
        & .aside__input-field{
            margin-bottom:20px;
        }
    }
`
export const ErrorMsg = styled.div`
    color:red;
`

export const PopoverInfo = styled.div`
    padding:2rem;
    & .popover-info-profile{
        display:flex;
    }
    & .popover-info-follow{
        display:flex;
    }
`