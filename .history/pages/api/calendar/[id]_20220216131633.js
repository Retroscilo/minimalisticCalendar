import dbConnect from "../../../lib/dbConnect";
import { User, Calendar, Event } from "../../../models";
import { getSession } from "next-auth/react";
import mongoose from "mongoose"

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
        console.log(req.body.event.name)
        const event = await Event.create({
          name: req.body.event.name,
          from: req.body.event.from,
          to: req.body.event.to,
          calendar: req.body.event.calendar
        })
        const calendar = await Calendar.findById(req.body.calendarId)

        calendar.events.push(event.id)
        await calendar.save()

        return res.status(200).json({ event })
      } catch (e) {
        console.log(e);
        return res.status(400).json({ success: "failed" });
      }
  }
}
