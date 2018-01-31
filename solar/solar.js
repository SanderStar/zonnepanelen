const request = require("request")
const config = require("../config/config")
const nconf = require("nconf");
const Q = require("q")

var solar = {
		
	summary: function() {
		console.log("Solar summary")
		var init = function() {
			var deferred = Q.defer()
			console.log("Solar init")
			config.loadConfig()
			return deferred.promise
		}
		
		init().then(this.getdata())
	},
	
	getdata: function() {
		console.log("Solar getdata ")

		var host = nconf.get("solarhost")
		var key = nconf.get("solarkey")
		var system = nconf.get("solarsystem")
		var userid = nconf.get("solaruserid")
		url = host + system + "?" + key + "&" + userid
		
		request(url, function(error, result, body) {
			if (error) {
				console.log("error " + error) 
			}
			if (result) {
				console.log("result " + JSON.stringify(result))
			}
			var data = JSON.parse(body)
			console.log(data)
		})
	}

}

module.exports = solar 

