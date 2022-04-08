const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')

const exampleRoutes = require('./routes/example_routes')

// // require database configuration logic
// // `db` will be the actual Mongo URI as a string
const db = require('./config/db')

// // define server and client ports
// // used for cors and local port declaration
const serverDevPort = 4000
const clientDevPort = 7165

// mongoose.connect('mongodb://127.0.0.1/test', { useNewUrlParser: true });
mongoose.connect(db, { useNewUrlParser: true });

const app = express()

// // set CORS headers on response from this API using the `cors` NPM package
// // `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}` }))

// // define port for API to run on
const port = process.env.PORT || serverDevPort

// // add `express.json` middleware which will parse JSON requests into
// // JS objects before they reach the route files.
// // The method `.use` sets up middleware for the Express application
app.use(express.json())
// // this parses requests sent by `$.ajax`, which use a different content type
app.use(express.urlencoded({ extended: true }))

app.use(exampleRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// mongoose.connection.once('open', function() {
//   console.log('connection has been made');
// }).on('error', function(error) {
//   console.log('error is: ', error);
// });
