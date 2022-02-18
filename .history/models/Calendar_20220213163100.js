import mongoose from "mongoose"

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
    
  }
})