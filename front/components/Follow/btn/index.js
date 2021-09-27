import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"

import styled from "styled-components"
import theme from "../../../styles/theme"
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
        <Button follow={Followed} type="button" onClick={onFollowing}>
          팔로잉
        </Button>
      ) : (
        <Button follow={Followed} type="button" onClick={onFollow}>
          팔로우
        </Button>
      )}
    </>
  )
}
const Button = styled.button`
  display: block;
  width: 7rem;
  height: 2.5rem;
  line-height: 2.5rem;
  margin: 0 auto;
  border: ${(props) =>
    props.follow ? "1px solid rgb(153,153,153)" : "1px solid rgb(0,0,0)"};
  background: ${(props) =>
    props.follow ? `${theme.pointColor.bg}` : `${theme.pointColor.purple}`};
  font-size: 1.2rem;
  color: ${(props) => (props.follow ? "rgb(153,153,153)" : "rgb(255,255,255)")};
`
FollowButton.propTypes = {
  id: PropTypes.number.isRequired,
}
export default FollowButton
