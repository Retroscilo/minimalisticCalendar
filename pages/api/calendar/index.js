import dbConnect from "../../../lib/dbConnect";
import {User, Calendar} from "../../../models";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  const session = await getSession({ req });

  if(!session) return res.status(403).json({ error: "You must be connected to create a calendar." })

  const user = await User.findOne({email: session.user.email})
  
  switch (method) {
    case "POST": {
      const { body } = req
      try {
        const calendar = await Calendar.create({
          name: body.name,
          owner: user._id
        });

        user.owned.push(calendar._id)
        await user.save()

        res.status(200).json({ id: user._id })
        break;
      } catch (e) {
        // console.log(e)
        res.status(400).json({ error: "failed" });
        break;
      }
    }
  }
}
