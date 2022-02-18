import mongoose from 'mongoose'

const UserSchema = new mongoose.schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide an email to register this user"]
  },
  password: {
    type: String
  },
  owned: { // owned calendars
    type: [mongoose.Schema.Types.ObjectId]
  },
  listened: { // calendars subscribed/invited in
    type: [mongoose.Schema.Types.ObjectId]
  }
})

export default mongoose.models.User || mongoose.model('User', UserSchema)