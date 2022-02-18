import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from 'next/link'

const Plannings = () => {
  const { data: session, status } = useSession();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/calendar", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "content-type": "application/JSON",
      },
    });
    const { id } = await res.json();
    window.location.href = `${window.location.origin}/plannings/${id}`;
  };

  if (!session) {
    return (
      <div>Vous ne pouvez pas accéder à cette page sans être connecté.</div>
    );
  }
  return (
    <>
      <div>Mes plannings</div>
      <div onClick={() => setCreating(true)}>Créer un calendrier</div>
      {session.user.owned.map(calendarId => (
        <Link key={calendarId} href={`/plannings/${calendarId}`}>
          <a>{calendarId}</a>
        </Link>
      ))}
      {creating && (
        <>
          <input type="text" onChange={(e) => setName(e.target.value)} />
          <button onClick={handleSubmit}>Créer</button>
        </>
      )}
    </>
  );
};

export default Plannings;
