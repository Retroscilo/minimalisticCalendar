import React, { useState, useEffect } from "react";

const Calendar = ({ calendar, eventCrud }) => {

  useEffect(() => console.log(calendar), [calendar])
  const { createEvent, removeEvent } = eventCrud;
  const [eventName, setEventName] = useState(null);
  return (
    <>
      <div>calendrier id : {calendar._id}</div>
      {calendar.events.map((event, i) => (
        <div key={i} onClick={() => removeEvent(event)}>
          {event.name}
        </div>
      ))}
      <div onClick={() => setEventName(true)}>Ajouter un évènement</div>
      {eventName && (
        <>
          <input onChange={(e) => setEventName(e.target.value)} type="text" />
          <div onClick={() => createEvent(eventName)}>Créer</div>
        </>
      )}
    </>
  );
};

export default Calendar;
