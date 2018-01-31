const express = require("express")
const routes = require("./routes/routes")
const bodyParser = require("body-parser")

const every = require("schedule").every

const solar = require("./solar/solar")

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use("/", routes)

// Schedule data timer
every("5s").do(function() {
	solar.summary()
});

// Server listener
const port = process.env.PORT || 3000
app.listen(port)

console.log('Express-server gestart op http://localhost:' + port);
