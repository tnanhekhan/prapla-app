import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  _id: String,
  exercises: [
    {
      _id: mongoose.Types.ObjectId,
      completed: Boolean
    }
  ],
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