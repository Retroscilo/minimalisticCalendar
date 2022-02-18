import mongoose, { Mongoose } from 'mongoose'

const UserSchema = new mongoose.schema({
  email: {
    type: String,
    required: [true, "Please provide an email to register this user"]
  },
  password: {
    type: String
  },
  owns: { // owned calendars
    type: [mongoose.Schema.Types.ObjectId]
  },
  listen: { // calendars subscribed/invited in
    type: [mongoose.Schema.Types.ObjectId]
  }
})

export default mongoose.models.User || mongoose.model('User', UserSchema)