const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  imgSource: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  hashtags: [String],
  likes: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Post', postSchema)
