import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"

import Button from "@material-ui/core/Button"

import { FOLLOWING_REQUEST, FOLLOW_REQUEST } from "../../../reducers/user"

const FollowButton = ({ id }) => {
  const dispatch = useDispatch()
  const { me } = useSelector((state) => state.user)
  const Followed = me.Followings.find((v) => v.id === id)

  const onFollow = useCallback(() => {
    dispatch({
      type: FOLLOW_REQUEST,
      data: id,
    })
  }, [])

  const onFollowing = useCallback(() => {
    dispatch({
      type: FOLLOWING_REQUEST,
      data: id,
    })
  }, [])

  return (
    <>
      {Followed ? (
        <Button variant="outlined" onClick={onFollowing}>
          팔로잉
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={onFollow}>
          팔로우
        </Button>
      )}
    </>
  )
}
FollowButton.propTypes = {
  id: PropTypes.number.isRequired,
}

export default FollowButton
