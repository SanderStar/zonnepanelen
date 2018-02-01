const request = require("request")
const config = require("../config/config")
const nconf = require("nconf")
const Q = require("q")
const cache = require("memory-cache");
const database = require("../database/database")

var solar = {
		
	summary: function() {
		console.log("Solar summary")
		var init = function() {
			var deferred = Q.defer()
			console.log("Solar init")
			config.loadConfig()
			return deferred.promise
		}
		
		init().then(this.getExternalData())
	},
	
	getExternalData: function() {
		console.log("Solar getdata")

		var host = nconf.get("solarhost")
		var key = nconf.get("solarkey")
		var system = nconf.get("solarsystem")
		var userid = nconf.get("solaruserid")
		url = host + system + "?" + key + "&" + userid
		
		request(url, function(error, result, body) {
			if (error) {
				console.log(error)
			} else {
				// TODO sometimes error 'undefined' -> check parseble
				var data = JSON.parse(body)
				var id = data.last_report_at
				if (!cache.get(id)) {
					console.log("Solar new data")
					cache.put(id, data)
					database.add(data)
				} else {
					console.log("Solar data already cached")
				}
			}
		})
	},
	
	getcache: function() {
		return Q.promise((resolve, reject) => {
			console.log("Solar getcache ")

			var keys = cache.keys()
			var data = []
			keys.forEach(function(key) {
				console.log("manier 1 " + JSON.stringify(cache.get(key)))
				data.push(cache.get(key))
			})
			
			data = []
			const init = database.init()
			var print = (res) => { 				
				res.forEach(function(item, index) {
					if (index === 1) {
						console.log("manier 2 " + JSON.stringify(item))
					}
					data.push(item)
				})
				resolve(data)
			}

			var log = () => { console.log("einde " + data.length) }

			init.then(database.connect).then(database.getX).then(print).then(log)
		})
		
	}

}

module.exports = solar 

