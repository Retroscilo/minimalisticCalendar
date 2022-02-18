import mongoose from "mongoose"

export const EventSchema = new mongoose.Schema({
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
    type: Text
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

export default mongoose.models.Event || mongoose.model('Event', EventSchema)