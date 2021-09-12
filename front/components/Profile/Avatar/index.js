import React from "react"
import PropTypes from "prop-types"

import Avatar from "@material-ui/core/Avatar"
import styled from "styled-components"

const ProfileAvatar = ({ src, alt, size }) => {
  return <AvatarIcon size={size} alt={alt} src={`${src}`} />
}
const AvatarIcon = styled(Avatar)`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  margin: auto;
  cursor: pointer;
`
ProfileAvatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  size: PropTypes.number,
  link: PropTypes.string,
}
export default ProfileAvatar
