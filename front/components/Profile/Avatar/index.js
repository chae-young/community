import React from "react"
import PropTypes from "prop-types"

import { Avatar } from "@material-ui/core"
import styled from "styled-components"

const ProfileAvatar = ({ src, alt, size }) => {
  return (
    <AvatarIcon size={size} alt={alt} {...(src && { src: `${src}` })}>
      {!src && alt[0]}
    </AvatarIcon>
  )
}
const AvatarIcon = styled(Avatar)`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  margin: auto;
  cursor: pointer;
`
ProfileAvatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  size: PropTypes.number,
  link: PropTypes.string,
}
export default ProfileAvatar
