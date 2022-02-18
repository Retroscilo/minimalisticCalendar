import dbConnect from "../../../lib/dbConnect";
import {User, Calendar, Event} from "../../../models"


export default async function handler (req, res) {
  const { method } = req
  await connectDb()

  switch(method) {
    case "POST": 
      
  }
}