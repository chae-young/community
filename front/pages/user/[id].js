import { useRouter } from "next/router"

const User = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <span></span>
    </div>
  )
}

export default User
