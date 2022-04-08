const express = require('express')
const Example = require('../models/example')
const router = express.Router()

router.get('/examples', (req, res, next) => {
  Example.find()
    .then(examples => {
      return examples.map(example => example.toObject())
    })
    .then(examples => res.status(200).json({ examples: examples }))
    .catch(next)
})

router.post('/examples', (req, res, next) => {

  Example.create(req.body.example)
    .then(example => {
      res.status(201).json({ example: example.toObject() })
    })
    .catch(next)
})

module.exports = router
