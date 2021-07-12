import React, { useEffect } from "react"
import { useDispatch } from "react-redux"

import Layout from "../components/Layout"
import MainList from "../components/MainList"
import { LOAD_USER_REQUEST } from "../reducers/user"

const Main = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: LOAD_USER_REQUEST })
  }, [])
  return (
    <Layout>
      <MainList />
    </Layout>
  )
}
export default Main
