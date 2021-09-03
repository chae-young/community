import React from "react"

import { withStyles } from "@material-ui/styles"
import Rating from "@material-ui/lab/Rating"

import styled from "styled-components"

const PostRating = ({ rate }) => {
  return (
    <Ratebox>
      <StyledRating precision={0.1} value={rate} readOnly />
      <span>{rate.substring(0, 3)}</span>
    </Ratebox>
  )
}

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

export default PostRating
