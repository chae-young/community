import React, { useState, useRef, useEffect, forwardRef } from "react"

import { AttachmentOutlined } from "@material-ui/icons"

import { CopyToClipboard } from "react-copy-to-clipboard"

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
      <ul ref={ref} style={props.style}>
        <li>트위터예정</li>
        <li>카카오예정</li>
        <li>
          <CopyToClipboard text={url} onCopy={() => setCopy(true)}>
            <button type="button">
              <AttachmentOutlined />
            </button>
          </CopyToClipboard>
        </li>
      </ul>
    </>
  )
}

export default forwardRef(ShareList)
