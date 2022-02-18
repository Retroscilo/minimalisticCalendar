import dbConnect from "../../../lib/dbConnect";
import { User, Calendar, Event } from "../../../models";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { method } = req;
  const session = getSession({ req })
  if(!session) return res.status(403).json({ message: "You must be authenticated." })
  
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        /* const newEvent = req.body.event
        newEvent.startDate = new Date(event.startDate)
        newEvent.endDate = new Date(event.endDate) */
        console.log(req.body.event)
        const event = await Event.create(req.body.event)
        const calendar = await Calendar.findById(req.body.calendarId)

        calendar.events.push(event.id)
        await calendar.save()

        return res.status(200).json({ event })
      } catch (e) {
        console.log(e);
        res.status(400).json({ success: "failed" });
      }
  }
}
