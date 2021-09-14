import React, { useEffect } from "react"
import router from "next/router"
import { useSelector } from "react-redux"

const AlertLogin = () => {
  const { me } = useSelector((state) => state.user)
  useEffect(() => {
    if (!me) {
      alert("로그인이 필요합니다.")
      router.push("/")
    }
  }, [me])

  const login = !me && ""
  return <div>{login}</div>
}
export default AlertLogin
