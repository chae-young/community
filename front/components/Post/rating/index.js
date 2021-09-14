import React from "react"
import PropTypes from "prop-types"

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

const Ratebox = styled.div`
  display: flex;
  > span {
    align-self: flex-end;
    padding-right: 0.3em;
  }
`
const StyledRating = withStyles({
  iconFilled: {
    color: "rgb(252,145,72)",
  },
  iconHover: {
    color: "rgb(252,145,72)",
  },
})(Rating)

PostRating.propTypes = {
  rate: PropTypes.string.isRequired,
}

export default PostRating
