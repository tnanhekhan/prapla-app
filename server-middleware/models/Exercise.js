import mongoose from 'mongoose'

const exerciseSchema = new mongoose.Schema({
  phrases: [{
    correct: Boolean,
    tries: Number,
    correctAnswer: String,
    word: String,
    images: Array,
    question: String
  }],
}, { collection: 'exercises' })

const Exercise = mongoose.model('exerciseModel', exerciseSchema)

export default Exercise