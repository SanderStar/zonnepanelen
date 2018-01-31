const express = require("express")
const path = require("path")
const request = require("request")
const config = require("../config/config")

const router = express.Router()

// Testing (environment)
console.log("ENV " + process.env.NODE_ENV);
config.loadConfig()
	.then(function() {
		console.log("Testing " + nconf.get("host") + nconf.get("port"));
	});


// Debuggen
router.use(function(req, res, next) {
	console.log("Router aangeroepen ", new Date())
	next()
})

// Show main page
router.get("/", function(req, res) {
	res.sendFile(path.resolve("public/index.html"))
})

// TODO Setting timer / remove
router.get("/timer", function(req, res) {
	// Reconstruct original URL
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	console.log("Setting timer " + fullUrl)
	request(fullUrl, function(error, result, body) {
		console.log("response " + response)
		console.log("error " + error) 
		console.log("result " + result)
		console.log("body " + body)
		response.send("hallo")
	})
})

// TODO Get solar panel data / replaced by schedule
router.get("/solarpanel", function(req, res) {
	console.log("Getting solar panel data")
	var url = "https://api.enphaseenergy.com/api/v2/systems/1338274/summary?key=97bd72a51ce15f497cef4eb553117b75&user_id=4d5455324d446b774f413d3d0a"
	request(url, function(error, result, body) {
		console.log("error " + error) 
		console.log("result " + result)
		console.log("body " + body)
		res.send(body)
	})
})

module.exports = router
