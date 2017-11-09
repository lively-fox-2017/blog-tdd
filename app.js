require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
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

var server = http.createServer(app);
server.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});


module.exports = app
