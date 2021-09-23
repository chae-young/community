import React from "react"
import Document, { Html, Head, Main, NextScript } from "next/document"
import { ServerStyleSheet } from "styled-components"
import { ServerStyleSheets } from "@material-ui/core/styles"

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const styledComponentsSheet = new ServerStyleSheet()
    const materialSheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentsSheet.collectStyles(
              materialSheets.collect(<App {...props} />),
            ),
        })
      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {materialSheets.getStyleElement()}
            {styledComponentsSheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      styledComponentsSheet.seal()
    }
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta charSet="utf-8" />

          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <script src="https://developers.kakao.com/sdk/js/kakao.js" />
          <script src="https://polyfill.io/v3/polyfill.min.js?features=default%2Ces2016%2Ces2015%2Ces2017%2Ces2018%2Ces2019" />
          <NextScript />
        </body>
      </Html>
    )
  }
}
export default MyDocument
