const express = require('express')
// const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const bcryptSaltRounds = 10

const errors = require('./../lib/custom_errors')
const BadParamsError = errors.BadParamsError
// const BadCredentialsError = errors.BadCredentialsError
const User = require('./../models/user')

// const requireToken = passport.authenticate('bearer', { session: false })

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

router.post('/sign-in', (req, res, next) => {
  const pw = req.body.credentials.password
  let user

  User.findOne({ username: req.body.credentials.username })
    .then(record => {
      if (!record) {
        throw new BadCredentialsError()
      }
      user = record

      return bcrypt.compare(pw, user.hashedPassword)
    })
    .then(correctPassword => {
      if (correctPassword) {
        const token = crypto.randomBytes(16).toString('hex')
        user.token = token

        return user.save()
      } else {
        throw new BadCredentialsError()
      }
    })
    .then(user => {
      res.status(201).json({ user: user.toObject() })
    })
    .catch(next)
})

module.exports = router
