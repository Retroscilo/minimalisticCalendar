import mongoose from "mongoose"
import { EventSchema } from "./Event.js"

const CalendarSchema = new mongoose.schema({
  name: {
    type: String,
    required: [true, "Provide a name to create a calendar"]
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "A calendar must have an owner"]
  },
  editors: {
    type: [mongoose.Schema.Types.ObjectId]
  },
  readers: {
    type: [mongoose.Schema.Types.ObjectId]
  },
  events: {
    type: [EventSchema]
  }
})

export default mongoose.models.Calendar || mongoose.model('Calendar', CalendarSchema)