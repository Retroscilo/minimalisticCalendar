export async function remove(eventId, calendarId) {
  try {
    const res = await fetch(`/api/calendar/${calendarId}`, {
      method: "DELETE",
      body: JSON.stringify({ eventId, calendarId }),
      headers: {
        "content-type": "application/JSON",
      },
    });
    const event = await res.json();
    return event;
  } catch (e) {
    console.log(e)
  }
}
