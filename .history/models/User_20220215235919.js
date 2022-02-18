import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide an email to register this user."]
  },
  name: {
    type: String,
    required: [true, "Users must have a name to register."]
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

export default mongoose.models?.User || mongoose.model('User', UserSchema)