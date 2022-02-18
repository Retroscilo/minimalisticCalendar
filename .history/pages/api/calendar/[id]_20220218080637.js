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
        const newCalendarEvents = removeObjectFromArray(calendar.events, event);
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

function removeObjectFromArray(array, objectToRemove) {
  return array.filter(
    (objectToCompare) => deepEqual(objectToRemove, objectToCompare)
  );
}

function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      areObjects && !deepEqual(val1, val2) ||
      !areObjects && val1 !== val2
    ) {
      return false;
    }
  }
  return true;
}
function isObject(object) {
  return object != null && typeof object === 'object';
}
