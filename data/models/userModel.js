const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
}, {collection: 'users'})


// Statics can be used like so
// Directly on the User mongoose object
// User.getUsers( .. .., () => {})
userSchema.statics = {

  //just return the plain javascript object. instead of mongoose
  getUsers: async () => mongoose.model('userModel', userSchema).find().lean(),

  updateUser: async (user) => {
    await User.updateOne(
      {'name': user.name},
    )
  }
}

const User = mongoose.model('userModel', userSchema)

module.exports = User