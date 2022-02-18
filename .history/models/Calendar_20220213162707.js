import mongoose from "mongoose"

const CalendarSchema = new mongoose.schema({
  name: {
    type: String,
    required: [true, "Provide a name to create a calendar"]
  },
  owner: {
    type: String
  }
})