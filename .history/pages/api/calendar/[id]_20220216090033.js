import dbConnect from "../../../lib/dbConnect";
import { User, Calendar, Event } from "../../../models";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { method } = req;
  const session = getSession(req)
  const userId = session.user.id

  re
  await connectDb();

  switch (method) {
    case "POST":
      try {
      } catch (e) {
        console.log(e);
        res.status(400).json({ success: "failed" });
      }
  }
}
