import React from "react"
import PropTypes from "prop-types"

import { Rating } from "@material-ui/lab"

import styled from "styled-components"

const PostRating = ({ rate }) => {
  return (
    <Ratebox>
      <Rating precision={0.1} value={rate} readOnly />
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

PostRating.propTypes = {
  rate: PropTypes.string.isRequired,
}

export default PostRating
