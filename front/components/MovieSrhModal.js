import React, { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"

import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import { Close, Search } from '@material-ui/icons';
import Modal from "@material-ui/core/Modal"

import { MOVIE_SRH_REQUEST } from "../reducers/movie"
import { SRH_IMAGE_UPLOAD } from "../reducers/post"
import { CloseBtn } from "../styles/style"

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: 500,
    height: "calc(100vh - 50%)",
    overflowY: "auto",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

const MovieSrhModal = ({ setSelectedIndex, setSelectedCheck }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { movieSrhList, movieSrhLoading } = useSelector((state) => state.movie)

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

  const onClickSrh = useCallback(() => {
    dispatch({
      type: MOVIE_SRH_REQUEST,
      data: text,
    })
  }, [text])

  const onClickImage = useCallback((index) => () => {
      setSelectedIndex(index)
      setOpen(false)
      dispatch({
        type: SRH_IMAGE_UPLOAD,
        data: movieSrhList[index].image,
      })
      setSelectedCheck(0)
  },[movieSrhList])

  return (
    <>
      <button type="button" onClick={handleOpen}>검색 <Search font-size="small"/></button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="image serach"
        aria-describedby="image serach"
      >
        <div className={classes.paper}>
          <CloseBtn onClick={handleClose}><Close fontSize="large" /></CloseBtn>
          <input
            type="text"
            value={text}
            onChange={onChangeText}
            placeholder="영화 제목을 입력해주세요."
          />
          <button onClick={onClickSrh}>검색</button>
          <Grid container className={classes.root} spacing={2}>
            {!movieSrhLoading && movieSrhList.length ? (
              movieSrhList.map((v, index) => (
                <Grid item xs={4} onClick={onClickImage(index)}>
                  <img src={v.image} alt={v.title} width="100%" />
                </Grid>
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </Grid>
        </div>
      </Modal>
    </>
  )
}

MovieSrhModal.propTypes = {
  setSelectedIndex: PropTypes.func.isRequired,
  setSelectedCheck: PropTypes.func.isRequired,
}

export default MovieSrhModal
