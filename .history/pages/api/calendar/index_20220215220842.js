import dbConnect from '../../../lib/dbConnect'
import Calendar from "../../../models/Calendar"

export default async function handler (req, res) {
  const method = {req}
  await dbConnect()
  const session = getSession()

  switch (method) {
    case "POST": {
      try {
        await Calendar.create()
      }
    }
  }
}