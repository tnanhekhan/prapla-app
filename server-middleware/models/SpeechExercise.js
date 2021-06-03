import mongoose from 'mongoose'

const exerciseSchema = new mongoose.Schema({
  phrases: [{
    correct: { type: Boolean, required: true },
    image: { type: String, required: true },
    word: { type: String, required: true },
    tries: { type: Number, required: true }
  }],
}, { collection: 'speechExercises' })

const SpeechExercise = mongoose.model('exerciseModel', exerciseSchema)

export default SpeechExercise