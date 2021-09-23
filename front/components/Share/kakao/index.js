import React, { useCallback, useEffect } from "react"
import { useRouter } from "next/router"

import Kakaicon from "../images/ico_kakao.png"
import styled from "styled-components"

const KakaoButton = ({ post }) => {
  const router = useRouter()

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY)
    }
    //console.log(Kakao.isInitialized())
  }, [])

  const onClickKakao = useCallback(() => {
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: post.title,
        description: post.content,
        imageUrl: post.Images[0].src,
        link: {
          mobileWebUrl: `https://emotion-feed.com${router.asPath}`,
          //androidExecutionParams: "test",
        },
      },
      social: {
        likeCount: post.Likers.length,
        commentCount: post.Comments.length,
        //sharedCount: 30,
      },
      buttons: [
        {
          title: "웹으로 이동",
          link: {
            mobileWebUrl: `https://emotion-feed.com${router.asPath}`,
          },
        },
        {
          title: "앱으로 이동",
          link: {
            mobileWebUrl: `https://emotion-feed.com${router.asPath}`,
          },
        },
      ],
    })
  }, [])

  return (
    <Button type="button" onClick={onClickKakao}>
      <img src={Kakaicon} alt="카카오톡 공유하기" width="100%" />
    </Button>
  )
}
const Button = styled.button`
  width: 2.5rem;
`
export default KakaoButton
