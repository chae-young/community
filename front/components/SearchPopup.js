import React, { useCallback, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router"

import { Search, Close } from "@material-ui/icons"
import styled from "styled-components"
import { REVIEW_SEARCH_REQUEST } from "../reducers/post"

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
  const dispatch = useDispatch()
  const router = useRouter()
  const { register, handleSubmit, watch } = useForm()
  //const watchAllFields = watch()
  const watchShowText = watch("searchText", false)
  const onSubmit = (data) => {
    //    console.log(data, watchShowText)
    // dispatch({
    //   type: REVIEW_SEARCH_REQUEST,
    //   data: data.searchText,
    // })
    router.push({
      pathname: `/search/${watchShowText}`,
      //query: { word: data.searchText },
    })
    //Router.push("/search", `/search/${data.searchText}`)
  }

  return (
    <SearchBox searchopen={searchopen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            placeholder="보고싶은 리뷰 영화제목을 검색해주세요"
            {...register("searchText")}
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
