const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
let article = require('./routes/article')
app.use('/article', article)
app.listen(4000, () => {
    console.log("Ready to port 3000")
})
module.exports = app