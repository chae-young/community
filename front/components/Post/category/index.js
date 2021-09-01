import React from "react"
import PropTypes from "prop-types"

import styled from "styled-components"
import { Select, MenuItem } from "@material-ui/core"

const SelectBox = styled(Select)`
  margin-bottom: 1rem;
  background: none;
  &:focus {
    background: none;
  }
`
const Category = ({ val, setCategory }) => {
  const handleChange = (event) => {
    setCategory(event.target.value)
  }
  return (
    <>
      <SelectBox
        value={val}
        onChange={handleChange}
        displayEmpty
        disableUnderline
      >
        <MenuItem value="">
          <em>카테고리</em>
        </MenuItem>
        <MenuItem value={0}>영화</MenuItem>
        <MenuItem value={1}>드라마</MenuItem>
        <MenuItem value={2}>다큐</MenuItem>
      </SelectBox>
    </>
  )
}

Category.propTypes = {
  val: PropTypes.number.isRequired,
  setCategory: PropTypes.func.isRequired,
}
export default Category
