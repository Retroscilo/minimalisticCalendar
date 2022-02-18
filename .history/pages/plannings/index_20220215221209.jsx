import React, {useState} from "react"
import { useSession } from "next-auth/react"

const Plannings = () => {
  const {data: session, status} = useSession()
  const [creating, setCreating] = useState(false)
  const [name, setName] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/calendar', {
      method: "POST",
      body: JSON.stringify({ name })
    })
    const id = await res.json()
    console.log(id)
  }

  if(!session) {
    return (
      <div>Vous ne pouvez pas accéder à cette page sans être connecté.</div>
    )
  }
  return (
    <>
    <div>Mes plannings</div>
    <div onClick={() => setCreating(true)}>Créer un calendrier</div>
    {creating && (
      <>
      <input type="text" onChange={e => setName(e.target.value)} />
      <button onSubmit={handleSubmit}>Créer</button>
      </>
    )}
    </>

  )
}

export default Plannings