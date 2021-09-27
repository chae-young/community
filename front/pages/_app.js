import React, { useEffect } from "react"
import PropTypes from "prop-types"
import Head from "next/head"

import { ThemeProvider } from "styled-components"
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
        <link rel="shortcut icon" href="/public/favicon.ico" />
        <meta name="keywords" content="리뷰,영화,드라마,다큐" />
        <meta
          name="description"
          content="emotion | 영화,tv 드라마,다큐 리뷰를 서로 공유해요"
          key="description"
        />
        <meta
          property="og:title"
          content="emotion | 리뷰 공유 서비스"
          key="title"
        />
        <meta
          property="og:description"
          content="emotion | 영화,tv 드라마,다큐 리뷰를 서로 공유해요"
          key="og:description"
        />
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
