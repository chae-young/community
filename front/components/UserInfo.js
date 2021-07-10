import React from "react"
import { useSelector } from "react-redux"

const UserInfo = () => {
  const { me } = useSelector((state) => state.user)

  return (
    <div>
      <h3>{me.userId}</h3>
      <ButtonGroup color="primary">
        <Button>
          내 글<br /> {me.Posts.length}
        </Button>
        <Button>
          팔로워
          <br /> {me.Followings.length}
        </Button>
        <Button>
          팔로잉
          <br /> {me.Followers.length}
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default UserInfo
