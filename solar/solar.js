const request = require("request")
const config = require("../config/config")
const nconf = require("nconf")
const Q = require("q")
const cache = require("memory-cache");

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
		console.log("Solar getdata")

		var host = nconf.get("solarhost")
		var key = nconf.get("solarkey")
		var system = nconf.get("solarsystem")
		var userid = nconf.get("solaruserid")
		url = host + system + "?" + key + "&" + userid
		
		request(url, function(error, result, body) {
			var data = JSON.parse(body)
			var id = data.last_report_at
			cache.put(id, data)
			console.log(data)
		})
	},
	
	getcache: function() {
		console.log("Solar getcache ")
		var keys = cache.keys()
		var data = []
		keys.forEach(function(key) {
			data.push(cache.get(key))
		})
		return data
	}

}

module.exports = solar 

