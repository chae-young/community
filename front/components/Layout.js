import React, { useCallback } from "react"
import PropTypes from "prop-types"
import { useRouter } from "next/router"

import styled from "styled-components"
import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ children }) => {
  const router = useRouter()

  const renderFooter = useCallback(() => {
    if (router.asPath !== "/write" || router.asPath.includes("post/edit")) {
      return <Footer />
    }
  }, [router.asPath])

  return (
    <>
      <Header />
      <Container footer={renderFooter()}>{children}</Container>
      {renderFooter()}
    </>
  )
}
const Container = styled.section`
  min-height: 540px;
  margin-top: 4rem;
`
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
