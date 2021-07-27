import React, { useCallback, useState, useEffect } from "react"
import { useForm } from "react-hook-form"

import { Search, Close } from "@material-ui/icons"
import styled from "styled-components"

const SearchBox = styled.div`
  width: ${(props) => (props.searchopen ? "20vw" : 0)};
  position: absolute;
  right: 0;
  top: 0;
  transition: all 0.5s ease;
  visibility: ${(props) => (props.searchopen ? "visible" : "hidden")};
`
const Input = styled.input`
  width: 100%;
  padding: 10px 20px;
  background: #000;
  color: #fff;

  &::placeholder {
    color: #fff;
  }
`
const SearchBtn = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  height: 100%;
  align-items: center;
`

const SearchPopup = ({ searchopen, onSearchClose }) => {
  console.log(onSearchClose)
  const { register, handleSubmit } = useForm()
  const onSubmit = useCallback((data) => {}, [])

  return (
    <SearchBox searchopen={searchopen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            placeholder="영화제목을 검색해주세요"
            {...register("search")}
          />
          <SearchBtn>
            <button type="submit" onClick={onSubmit}>
              <Search style={{ color: "#fff" }} />
            </button>
            <button type="button" onClick={onSearchClose}>
              <Close style={{ color: "#fff" }} />
            </button>
          </SearchBtn>
        </div>
      </form>
    </SearchBox>
  )
}

export default SearchPopup
