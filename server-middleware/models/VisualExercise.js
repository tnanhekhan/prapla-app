import mongoose from 'mongoose'

const visualSchema = new mongoose.Schema({
  phrases: [{
    correct: { type: Boolean, required: true },
    images: { type: Array, required: true},
    question: { type: String, required: true },
    tries: { type: Number, required: true }
  }],
}, { collection: 'visualExercises' })

const VisualExercise = mongoose.model('visualModel', visualSchema)

export default VisualExercise