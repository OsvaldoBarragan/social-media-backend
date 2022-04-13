const express = require('express')
const passport = require('passport')
const Post = require('../models/post')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

router.get('/posts', (req, res, next) => {

  Post.find()
    .then(posts => {
      return posts.map(post => post.toObject())
    })
    .then(posts => res.status(200).json({ posts: posts }))
    .catch(next)
})

router.post('/posts', requireToken, (req, res, next) => {

  req.body.post.owner = req.user.id

  Post.create(req.body.post)
    .then(post => {
      res.status(201).json({ post: post.toObject() })
    })
    .catch(next)
})

module.exports = router
