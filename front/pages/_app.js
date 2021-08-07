import React, { useEffect } from "react"
import PropTypes from "prop-types"
import Head from "next/head"

import { ThemeProvider } from "@material-ui/core/styles"

import "../styles/swiper.css"
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
        <title>moviefeeds</title>
        <link rel="shortcut icon" href="/favicon.ico" />
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
