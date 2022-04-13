const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  imageSource: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  hashtags: [String],
  numOfLikes: 0,
  usersWhoLiked: [String],
  owner: {
    // the reference type
    type: mongoose.Schema.Types.ObjectId,
    // when the owner is populated, use the User model
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Post', postSchema)
