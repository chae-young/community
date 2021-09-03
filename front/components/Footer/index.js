import React from "react"

import styled from "styled-components"

const Footer = () => {
  return (
    <FooterWrap>
      <FooterInner>Copyright 2021 emotion</FooterInner>
    </FooterWrap>
  )
}

const FooterWrap = styled.footer`
  background: rgb(0, 0, 0);
`
const FooterInner = styled.div`
  max-width: 1400px;
  padding: 4rem 0;
  margin: 0 auto;
  text-align: center;
  color: rgb(153, 153, 153);
`
export default Footer
