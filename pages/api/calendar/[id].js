import dbConnect from "../../../lib/dbConnect";
import { User, Calendar, Event } from "../../../models";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { method } = req;
  const session = await getSession({ req });
  if (!session)
    return res.status(403).json({ error: "Oups, vous n'êtes pas connecté !" });

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const calendar = await Calendar.findById(req.query.id);
        console.log(req.query.id, calendar)
        if (!calendar) {
          return res.status(404).json({
            error: "Oups ! Ce calendrier n'existe pas...",
          });
        }
        const userId = session.user.id;

        // if user is neither in readers, editors nor owner return null
        const owner = calendar.owner.toString();
        const editors = calendar.editors.map((editor) => editor.toString());
        const readers = calendar.readers.map((reader) => reader.toString());
        if (
          !calendar.public &&
          [owner, ...editors, ...readers].indexOf(userId.toString()) === -1
        ) {
          return res.status(401).json({
            error:
              "Oups ! Vous n'avez pas les autorisations pour accéder à ce calendrier.",
          });
        }

        return res.status(200).json(calendar);
      } catch (e) {
        console.log(e);
        return res
          .status(500)
          .json({
            error:
              "Quelque chose s'est mal passé, un rapport viens d'être envoyé et nous allons résoudre le problème d'ici peu !",
          });
      }
    case "POST":
      try {
        const event = await Event.create({
          name: req.body.name,
          from: req.body.from,
          to: req.body.to,
          calendar: req.body.calendar,
        });
        const calendar = await Calendar.findById(req.body.calendar);
        calendar.events.push(event);
        await calendar.save();

        return res.status(200).json(calendar);
      } catch (e) {
        console.log(e);
        return res.status(400).json({ error: "failed" });
      }
    case "DELETE":
      try {
        const eventToRemove= req.body;
        const event = await Event.findById(eventToRemove._id);
        const calendar = await Calendar.findById(eventToRemove.calendar);
        const newCalendarEvents = calendar.events.filter(
          (event) => event._id.toString() !== eventToRemove._id
        );
        calendar.events = newCalendarEvents;

        await event.remove();
        await calendar.save();

        return res.status(200).json(event);
      } catch (e) {
        console.log(e);
        return res.status(400).json({ error: "failed" });
      }
    case "PUT":
      try {
        const { id: eventId } = req.query;
        // console.log(eventId)
      } catch (e) {
        console.log(e);
        res.Status(400).json({ succes: "failed" });
      }
  }
}
