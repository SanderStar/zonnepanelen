const express = require("express")
const routes = require("./routes/routes")
const bodyParser = require("body-parser")
const schedule = require("./schedule/schedule")

var app = express()

app.set("views", "./views")
app.set("view engine", "pug")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use("/", routes)

schedule.start()

// Server listener
const port = process.env.PORT || 3000
app.listen(port)

console.log("Server gestart op http://localhost:" + port);
