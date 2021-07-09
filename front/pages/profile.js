import React from "react"

import { Button, ButtonGroup } from "@material-ui/core"

import Layout from "../components/Layout"

const Profile = () => {
  return (
    <Layout>
      <h2>내 프로필</h2>
      <div>
        <img />
      </div>
      <div>
        <h3>아이디</h3>
        <ButtonGroup color="primary">
          <Button>게시글</Button>
          <Button>팔로우</Button>
          <Button>팔로잉</Button>
        </ButtonGroup>
      </div>
    </Layout>
  )
}
export default Profile
