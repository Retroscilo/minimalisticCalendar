import mongoose, { Mongoose } from 'mongoose'

const UserSchema = new mongoose.schema({
  email: {
    type: String,
    required: [true, "Please provide an email to register this user"]
  },
  password: {
    type: String
  },
  
})