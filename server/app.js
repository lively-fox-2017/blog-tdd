const express=require('express')
const app= express()
const mongoose = require('mongoose');
mongoose.connection.openUri('mongodb://localhost/blog')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'html');

const blog = require('./routes/blog')

app.use('/blog',blog)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

module.exports = app;
