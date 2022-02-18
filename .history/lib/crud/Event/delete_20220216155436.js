export async function remove(body, calendarId) {
  const res = await fetch(`/api/calendar/${calendarId}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/JSON",
    },
  });
  const event = await res.json();
  return event
}