import React from "react"
import PropTypes from "prop-types"
import { useRouter } from "next/router"

import styled from "styled-components"
import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ children }) => {
  const router = useRouter()
  return (
    <>
      <Header />
      <Container>{children}</Container>
      {router.asPath !== "/write" && <Footer />}
    </>
  )
}
const Container = styled.section`
  min-height: 540px;
  margin-top: 4rem;
  padding-bottom: 8rem;
`
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
