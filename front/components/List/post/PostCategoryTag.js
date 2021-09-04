import React from "react"
import PropTypes from "prop-types"

import styled from "styled-components"

const CategoryTag = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 0.3rem 0.5rem;
  font-size: 1.6rem;
  color: rgb(0, 0, 0);
  background: ${({ name }) =>
    (name === "MOVIE" && "rgb(102 178 107)") ||
    (name === "DRAMA" && "rgb(144 210 211)") ||
    "rgb(252 145 72)"};
`

const PostCategoryTag = ({ category }) => {
  return <CategoryTag name={category}>{category}</CategoryTag>
}
PostCategoryTag.propTypes = {
  category: PropTypes.string.isRequired,
}
export default PostCategoryTag
