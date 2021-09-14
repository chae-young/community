import React, { useState, useEffect } from "react"

export default (object = null, loading, done, dispatch) => {
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    const loadOnScroll = () => {
      if (
        Math.round(window.scrollY) + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 200
      ) {
        if (done) setFlag(false)
        if (!flag && !loading) {
          dispatch()
          setFlag(true)
        }
      }
    }

    window.addEventListener("scroll", loadOnScroll)
    return () => {
      window.removeEventListener("scroll", loadOnScroll)
    }
  }, [object, loading, flag])
}
