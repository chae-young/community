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
const Category = ({ categoryName, setCategory }) => {
  const handleChange = (event) => {
    setCategory(event.target.value)
  }
  return (
    <>
      <SelectBox
        value={categoryName}
        onChange={handleChange}
        displayEmpty
        disableUnderline
      >
        <MenuItem value="">
          <em>카테고리</em>
        </MenuItem>
        <MenuItem value="MOVIE">MOVIE</MenuItem>
        <MenuItem value="DRAMA">DRAMA</MenuItem>
        <MenuItem value="DOCUMENTARY">DOCUMENTARY</MenuItem>
      </SelectBox>
    </>
  )
}

Category.propTypes = {
  categoryName: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
}
export default Category
