import React, { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"

import Grid from "@material-ui/core/Grid"
import { Close, Search } from "@material-ui/icons"
import Modal from "@material-ui/core/Modal"

import styled from "styled-components"
import { MOVIE_SRH_REQUEST } from "../reducers/movie"
import { SRH_IMAGE_UPLOAD_REQUEST } from "../reducers/post"
import { CloseBtn, FormInput, ListPoster } from "../styles/style"

const ModalInner = styled.div`
  ${({ theme }) => `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 640px;
    height: calc(100vh - 50%);
    padding: 4rem;
    overflow-y: auto;
    background: ${theme.pointColor.bg};
    border: ${theme.pointColor.border};
    box-sizing: border-box;
`}
`
const SearchBox = styled.div`
  ${({ theme }) => `
  position: relative;
  & button {
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    background: ${theme.pointColor.bg};
  `}
`
const SearchResult = styled.p`
  width: 100%;
  padding: 50px 0 0;
  text-align: center;
`
const MovieSrhModal = ({ setSelectedCheck }) => {
  const dispatch = useDispatch()
  const { movieSrhList, movieSrhDone } = useSelector((state) => state.movie)

  const [text, setText] = useState("")
  const onChangeText = useCallback((e) => {
    setText(e.target.value)
  }, [])
  const [open, setOpen] = useState(false)
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const [nosearchResult, setNosearchResult] =
    useState("영화제목을 검색해주세요.")
  const onClickSrh = useCallback(
    (e) => {
      setNosearchResult("")
      dispatch({
        type: MOVIE_SRH_REQUEST,
        data: text,
      })
    },
    [text],
  )

  return (
    <>
      <button type="button" onClick={handleOpen}>
        검색
        {/* 검색 <Search font-size="small" style={{ padding: "0 0.5rem" }} /> */}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="image serach"
        aria-describedby="image serach"
      >
        <ModalInner>
          <CloseBtn onClick={handleClose}>
            <Close fontSize="large" />
          </CloseBtn>
          <SearchBox>
            <FormInput
              type="text"
              value={text}
              onChange={onChangeText}
              autoFocus
              placeholder="영화 제목을 검색해주세요."
            />
            <button type="button" onClick={onClickSrh}>
              <Search />
            </button>
          </SearchBox>
          <Grid container spacing={2}>
            {movieSrhList.length
              ? movieSrhList.map((v, index) => (
                  <Grid item xs={4} onClick={onClickImage(index)}>
                    <ListPoster heightVal="20em">
                      <img src={v.link} alt={v.title} width="100%" />
                    </ListPoster>
                  </Grid>
                ))
              : ""}
            <SearchResult>
              {movieSrhDone && !movieSrhList.length
                ? "검색 결과가 없습니다."
                : nosearchResult}
            </SearchResult>
          </Grid>
        </ModalInner>
      </Modal>
    </>
  )
}

MovieSrhModal.propTypes = {
  setSelectedCheck: PropTypes.func.isRequired,
}

export default MovieSrhModal
