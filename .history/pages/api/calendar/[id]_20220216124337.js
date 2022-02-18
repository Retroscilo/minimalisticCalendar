import dbConnect from "../../../lib/dbConnect";
import { User, Calendar, Event } from "../../../models";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { method, body } = req;
  const session = getSession(req)
  if(!session) return res.status(403).json({ message: "You must be authenticated." })
  
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const event = await Event.create(body.event)
        const calendar = await Calendar.findOneById(body.id)

        calendar.events.push(event.id)
        await calendar.save()

        return res.status(200).json({ event })
      } catch (e) {
        console.log(e);
        res.status(400).json({ success: "failed" });
      }
  }
}
