import React from "react"
import { useSession } from "next-auth/react"

const Plannings = () => {
  const {data: session, status} = useSession()
  const [creating, setCreating] = useState(false)

  if(!session) {
    return (
      <div>Vous ne pouvez pas accéder à cette page sans être connecté.</div>
    )
  }
  return (
    <>
    <div>Mes plannings</div>
    <div onClick={setCreating(true)}>Créer un calendrier</div>
    </>

  )
}

export default Plannings