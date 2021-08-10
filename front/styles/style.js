import styled, { css } from "styled-components"
import { withStyles } from "@material-ui/core/styles"
import Rating from "@material-ui/lab/Rating"
import theme from "./theme"

export const InputStyle = css`
  padding: 0;
  background: none;
  border: 0;
  border-bottom: ${theme.pointColor.border};
`
export const ButtonStyle = css`
  border: ${theme.pointColor.border};
  background: ${theme.pointColor.purple};
  color: rgb(255, 255, 255);
`
export const ListPoster = styled.div`
  width: 100%;
  height: ${(props) => props.heightVal};
  box-sizing: border-box;
  overflow: hidden;
  & img {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: auto;
  }
`
export const ListContent = styled.div`
  padding: 20px 0 0;
  font-size: 1.2rem;
  color: rgb(0, 0, 0);
  > p {
    margin-bottom: 0.5em;
  }
`
export const Ratebox = styled.div`
  display: flex;
  > span {
    align-self: flex-end;
    padding-right: 0.3em;
  }
`
export const StyledRating = withStyles({
  iconFilled: {
    color: "rgb(252,145,72)",
  },
  iconHover: {
    color: "rgb(252,145,72)",
  },
})(Rating)

export const FormInput = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 15px;
  ${InputStyle}
`

export const CloseBtn = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
}
`

export const HeaderUtillMenu = styled.ul`
  float: right;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  > li:first-child {
    padding: 0 2rem;
    font-weight: bold;
  }
`

export const ErrorMsg = styled.div`
  color: red;
`

export const PopoverWrap = styled.div`
  padding: 2rem;
`
export const PopoverProfile = styled.div`
  display: flex;
`
export const PopoverBtn = styled.div`
  display: flex;
`
export const PopoverInfo = styled.div`
  padding: 1rem;
  & .nick {
    text-decoration: none;
    font-size: 1.4rem;
    font-weight: bold;
    color: rgb(0, 0, 0);
    &:hover {
      text-decoration: underline;
    }
  }
  & .id {
    display: block;
    margin-top: 10px;
    font-size: 1.2rem;
    color: rgb(102, 102, 102);
  }
`
export const PostListLi = styled.div`
  display: flex;
  & .post-list__img {
    display: flex;
    justify-content: center;
    flex-direction: row;
    width: 148px;
    height: 148px;
    overflow: hidden;

    > img {
      flex: 1;
      height: 100%;
    }
  }
  & .post-list__con {
    display: flex;
    width: 100%;
    align-items: center;

    > p {
      flex: 8;
    }
    > span {
      flex: 1;
      text-align: center;
    }
  }
`
