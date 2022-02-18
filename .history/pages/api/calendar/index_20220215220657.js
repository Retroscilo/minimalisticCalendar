import dbConnect from '../../../lib/dbConnect'
import Calendar from "../../../models/Calendar"

export default async function handler (req, res) {
  await dbConnect()
}