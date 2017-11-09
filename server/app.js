const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Routing

const signup = require('./routers/signup')
const signin = require('./routers/signin')
const index = require('./routers/index')

app.use('/signup', signup)
app.use('/signin', signin)
app.use('/', index)

app.listen(3123, () => {
  console.log(`AYO JALAN!`)
})
