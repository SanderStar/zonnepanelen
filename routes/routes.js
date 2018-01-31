const express = require("express");
const path = require('path');
const router = express.Router();

// Debuggen
router.use(function(req, res, next) {
	console.log("Router aangeroepen ", new Date());
	next();
});

// Show main page
router.get("/", function(req, res) {
	res.sendFile(path.resolve("public/index.html"));
});

module.exports = router;
