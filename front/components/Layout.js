import React, { useCallback } from "react"
import PropTypes from "prop-types"
import { useRouter } from "next/router"

import styled from "styled-components"
import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ children }) => {
  const router = useRouter()
  const footerStatus =
    router.asPath !== "/write" || router.asPath.includes("post/edit")

  const renderFooer = useCallback(() => {
    if (footerStatus) {
      return <Footer />
    }
  }, [router.asPath])

  return (
    <>
      <Header />
      <Container footer={footerStatus}>{children}</Container>
      {renderFooer}
    </>
  )
}
const Container = styled.section`
  min-height: 540px;
  margin-top: 4rem;
  padding-bottom: ${(props) => !props.footer && "8rem"};
`
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
