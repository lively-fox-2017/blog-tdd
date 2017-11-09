const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
var cors = require('cors')


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use(cors())

let artikel = require('./routers/artikel.js')
let user = require('./routers/user.js')

app.use('/artikel',artikel)
app.use('/user',user)

app.listen(3000,()=>{
  console.log('Running TDD');
})

module.exports = app
