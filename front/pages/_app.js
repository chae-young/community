import React, { useEffect } from "react"
import PropTypes from "prop-types"
import Head from "next/head"

import { ThemeProvider } from "@material-ui/core/styles"

import GlobalStyle from "../styles/GlobalStyle"
import wrapper from "../store/configureStore"

const App = ({ Component }) => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>?? COMMUNITY</title>
      </Head>
      <ThemeProvider>
        <GlobalStyle />
        <Component />
      </ThemeProvider>
    </>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(App)
