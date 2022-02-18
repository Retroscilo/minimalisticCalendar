import dbConnect from "../../../lib/dbConnect";
import {User, Calendar} from "../../../models";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();
  const session = await getSession({ req });

  if(!session) return res.status(403).json({ message: "You must be connected to create a calendar." })

  const user = await User.findOne({email: session.user.email})

  switch (method) {
    case "POST": {
      try {
        await Calendar.create({
          name: body.name,
          owner: user._id
        });
      } catch (e) {
        res.status(400).json({ success: false });
      }
    }
  }
}
