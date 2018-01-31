const express = require("express")
const routes = require("./routes/routes")
const bodyParser = require("body-parser")

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use("/", routes)

app.listen(process.env.PORT || 3000)

//console.log('Express-server gestart op http://localhost:' + process.env.PORT || 3000);
