import React, { useCallback, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router"

import { Search, Close } from "@material-ui/icons"
import styled from "styled-components"
import { REVIEW_SEARCH_REQUEST } from "../../reducers/post"

const SearchBox = styled.div`
  width: 100%;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 11;
  transform: ${(props) =>
    props.searchopen ? "translateY(0)" : "translateY(-100%)"};
  visibility: ${(props) => (props.searchopen ? "visible" : "hidden")};
  background: rgb(0, 0, 0);

  & .inner {
    position: relative;
    height: 65px;
    margin: 0 20px;
  }
`
const Input = styled.input`
  width: 100%;
  height: 100%;
  border: 0;
  background: #000;
  color: #fff;
  box-sizing: border-box;
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
  // const watchAllFields = watch()
  const watchShowText = watch("searchText", false)
  const onSubmit = (data) => {
    //    console.log(data, watchShowText)
    // dispatch({
    //   type: REVIEW_SEARCH_REQUEST,
    //   data: data.searchText,
    // })
    router.push({
      pathname: `/search/${watchShowText}`,
      // query: { word: data.searchText },
    })
    // Router.push("/search", `/search/${data.searchText}`)
  }

  return (
    <SearchBox searchopen={searchopen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inner">
          <Input
            placeholder="보고싶은 리뷰 영화제목을 검색해주세요"
            {...register("searchText")}
            autoFocus
          />
          <SearchBtn>
            <button type="submit" onClick={onSubmit}>
              <Search style={{ color: "#fff" }} fontSize="large" />
            </button>
            <button type="button" onClick={onSearchClose}>
              <Close style={{ color: "#fff" }} fontSize="large" />
            </button>
          </SearchBtn>
        </div>
      </form>
    </SearchBox>
  )
}
SearchPopup.propTypes = {
  searchopen: PropTypes.bool.isRequired,
  onSearchClose: PropTypes.func.isRequired,
}
export default SearchPopup
