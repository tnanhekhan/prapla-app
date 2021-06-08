import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  _id: String,
  exercises: Array,
  name: {
    firstname: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
  }
})

const User = mongoose.model('User', userSchema)

export default User