import React, { useEffect } from "react"
import PropTypes from "prop-types"
import Head from "next/head"

import styled, { ThemeProvider } from "styled-components"
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles"

import "../styles/swiper.css"
import GlobalStyle from "../styles/GlobalStyle"
import wrapper from "../store/configureStore"
import theme from "../styles/theme"

const App = ({ Component }) => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  const myTheme = createMuiTheme()

  return (
    <>
      <Head>
        <title>emotion</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <GlobalStyle />
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={myTheme}>
          <ThemeProvider theme={theme}>
            <Component />
          </ThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(App)
