const express = require('express')
// const crypto = require('crypto')
const bcrypt = require('bcrypt')
const bcryptSaltRounds = 10

const errors = require('./../lib/custom_errors')
const BadParamsError = errors.BadParamsError
const User = require('./../models/user')

const router = express.Router()

router.get('/users', (req, res, next) => {

  User.find()
    .then(users => {
      return users.map(user => user.toObject())
    })
    .then(users => res.status(200).json({ users: users }))
    .catch(next)
})

router.post('/sign-up', (req, res, next) => {
  Promise.resolve(req.body.credentials)
    .then(credentials => {
      if (!credentials ||
        !credentials.password ||
        credentials.password !== credentials.password_confirmation) {
          throw new BadParamsError()
        }
    })
    .then(() => bcrypt.hash(req.body.credentials.password, bcryptSaltRounds))
    .then(hash => {
      return {
        email: req.body.credentials.email,
        username: req.body.credentials.username,
        hashedPassword: hash
      }
    })
    .then(user => User.create(user))
    .then(user => res.status(201).json({ user: user.toObject() }))
    .catch(next)
})

module.exports = router
