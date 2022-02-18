import React from "react"
import { useSession } from "next-auth/react"

const Plannings = () => {
  const {data: session, status} = useSession()

  if(!session) {
    return (
      <div>Vous ne pouvez pas accéder à cette page sans être connecté.</div>
    )
  }
  return (
    <div>Mes plannings</div>
  )
}

export default Plannings