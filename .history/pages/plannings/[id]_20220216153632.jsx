import React, { useState } from "react";
import { User, Calendar } from "../../models";
import dbConnect from "../../lib/dbConnect";
import { getSession } from "next-auth/react";
import { create as createEvent } from "../../lib/crud/event" 

const Planning = ({ calendar }) => {
  if (!calendar)
  return (
    <div>
      Oups ! Ce calendrier n'existe pas ou vous n'avez pas les autorisations
      nécessaires pour y accéder.
    </div>
  );
  const calendarId = calendar._id;
  const [eventName, setEventName] = useState(null);

  const createEvent = async () => {
    const body = {
      calendarId,
      event: {
        name: eventName,
        from: new Date(),
        to: new Date(),
        calendar: calendarId,
      },
    };

    const res = await fetch(`/api/calendar/${calendarId}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/JSON",
      },
    });
    const event = await res.json();
  };


  return (
    <>
      <div>calendrier id : {calendar._id}</div>;
      <div onClick={() => setEventName(true)}>Ajouter un évènement</div>
      {eventName && (
        <>
          <input onChange={(e) => setEventName(e.target.value)} type="text" />
          <div onClick={createEvent}>Créer</div>
        </>
      )}
    </>
  );
};

export default Planning;

export async function getServerSideProps(context) {
  await dbConnect();
  const calendar = await Calendar.findById(context.params.id).lean();
  const session = await getSession(context);
  if (!session || !calendar) return { props: { calendar: null } };
  const userId = session.user.id;

  const owner = calendar.owner.toString();
  const editors = calendar.editors.map((editor) => editor.toString());
  const readers = calendar.readers.map((reader) => reader.toString());
  if (
    !calendar.public &&
    [owner, ...editors, ...readers].indexOf(userId.toString()) === -1
  )
    return { props: { calendar: null } };

  return { props: { calendar: JSON.parse(JSON.stringify(calendar)) } };
}
