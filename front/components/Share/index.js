import React, { useState, useEffect, forwardRef } from "react"

import { AttachmentOutlined } from "@material-ui/icons"

import styled from "styled-components"
import { CopyToClipboard } from "react-copy-to-clipboard"
import KakaoButton from "./kakao/index"

const ShareList = (props, ref) => {
  const [url, setUrl] = useState(null)
  const [copy, setCopy] = useState(false)

  useEffect(() => {
    setUrl(window.location.href)
    if (copy) {
      alert("url이 복사되었습니다")
    }
  }, [copy])

  return (
    <>
      <Ullayout ref={ref} style={props.width >= 1024 ? props.style : null}>
        <li>
          <KakaoButton post={props.post} />
        </li>
        <li>
          <CopyToClipboard text={url} onCopy={() => setCopy(true)}>
            <button type="button">
              <AttachmentOutlined fontSize="large" />
            </button>
          </CopyToClipboard>
        </li>
      </Ullayout>
    </>
  )
}
const Ullayout = styled.ul`
  > li + li {
    margin: 1rem 0 0 0;
  }
  @media (max-width: 943px) {
    display: flex;
    align-items: center;
    margin: 0 0 2rem 0;
    > li + li {
      margin: 0 0 0 1rem;
    }
  }
`
export default forwardRef(ShareList)
