const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
dbLink = 'mongodb://localhost/blog'
// mongoose.connect('mongodb://localhost/blog')

mongoose.connect(dbLink)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const blogs = require('./routers/blog')

app.use('/',blogs)

app.listen(process.env.PORT || 3000, ()=>{
  console.log('i am running at port 3000');
})

module.exports = app
