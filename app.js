const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const article = require('./routers/article.js')
const user = require('./routers/user.js')
const auth = require('./routers/auth.js')

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('/api/article', article)

app.listen(3000)

module.exports = app;
