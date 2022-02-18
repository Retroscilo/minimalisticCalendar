import dbConnect from "../../../lib/dbConnect";
import { User, Calendar, Event } from "../../../models";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { method, body } = req;
  const session = getSession(req)
  if(!session) return res.status(403).json({ message: "You must be authenticated." })
  
  await connectDb();

  switch (method) {
    case "POST":
      try {
        const event = await event.create
        const calendar = await Calendar.findOneById(body.id)
      } catch (e) {
        console.log(e);
        res.status(400).json({ success: "failed" });
      }
  }
}
