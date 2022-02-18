import dbConnect from '../../../lib/dbConnect'
import Calendar from "../../../models/Calendar"
import { getSession } from 'next-auth/react'

export default async function handler (req, res) {
  const method = {req}
  await dbConnect()
  const session = await getSession({req})

  switch (method) {
    case "POST": {
      try {
        await Calendar.create()
      }
    }
  }
}