import React from "react"
import { useSession } from "next-auth/react"

const Plannings = () => {
  const [data: session, status] = useSession()
  return (
    <div>My calendars</div>
  )
}

export default Plannings