const config = require("../config/config")
const nconf = require("nconf")
const Q = require("q")

var	init = function() {
		return Q.promise((resolve, reject) => {
			console.log("Init")
			config.loadConfig()
			resolve()
		})
	}
	
var test = () => {
	var url = nconf.get("databaseurl")
	console.log("test " + url);
}

init().then(test)