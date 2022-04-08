const express = require('express')
const port = 3000

const exampleRoutes = require('./routes/example_routes')
const app = express()

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(exampleRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
