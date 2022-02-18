import mongoose from "mongoose"

export const EventSchema = new mongoose.schema({
  name: {
    type: String,
    required: [true, "An event must have a name."]
  },
  from: {
    type: Date,
    required: [true, "An event must have a start date."]
  },
  to: {
    type: Date,
    required: [true, "An event must have an end date."]
  },
  description: {
    type: String
  },
  color: {
    type: String,
    default: "royalblue"
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "An event must have an owner."]
  }
})

