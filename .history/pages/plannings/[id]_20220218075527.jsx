import React, { useState } from "react";
import { User, Calendar } from "../../models";
import dbConnect from "../../lib/dbConnect";
import { getSession } from "next-auth/react";
import { create, remove } from "../../lib/crud/event" 

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
    await create(body, calendarId)
  };

  const removeEvent = async (eventId) => remove(eventId, calendarId)


  return (
    <>
      <div>calendrier id : {calendar._id}</div>;
      {calendar.events.map(event => (
        <>
        <div key={event._id} onClick={() => removeEvent(event._id)}>{event._id}</div>
        <br />
        </>
      ))}
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

  // user is neither in reader, editor nor owner
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
