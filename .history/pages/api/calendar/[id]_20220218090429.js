import dbConnect from "../../../lib/dbConnect";
import { User, Calendar, Event } from "../../../models";
import { getSession } from "next-auth/react";
import mongoose from "mongoose";
import util from "util";

export default async function handler(req, res) {
  const { method } = req;
  const session = getSession({ req });
  if (!session)
    return res.status(403).json({ message: "You must be authenticated." });

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const event = await Event.create({
          name: req.body.event.name,
          from: req.body.event.from,
          to: req.body.event.to,
          calendar: req.body.event.calendar,
        });
        const calendar = await Calendar.findById(req.body.calendarId);
        calendar.events.push(event);
        await calendar.save();

        return res.status(200).json(event);
      } catch (e) {
        // console.log(e);
        return res.status(400).json({ success: "failed" });
      }
    case "DELETE":
      try {
        const { eventId, calendarId } = req.body;
        const event = await Event.findById(eventId);
        const calendar = await Calendar.findById(calendarId);
        const newCalendarEvents = calendar.events.filter(event => !hasSameId(event, eventId))
        calendar.events = newCalendarEvents;

        await event.remove();
        await calendar.save();

        return res.status(200).json(event);
      } catch (e) {
        console.log(e);
        return res.status(400).json({ success: "failed" });
      }
  }
}

function hasSameId (object1, object2) {
  return object1._id.toString() === object2._id.toString()
} 