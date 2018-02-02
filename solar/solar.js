const request = require("request")
const config = require("../config/config")
const nconf = require("nconf")
const Q = require("q")
const cache = require("memory-cache");
const database = require("../database/database")
var moment = require("moment-timezone")

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
	
	getData: function() {
		return Q.promise((resolve, reject) => {
			console.log("Solar getcache ")

			var data = []
			var print = (res) => {
				res.sort((a,b) => {
					var a = new Date(a.last_report_at)
					var b = new Date(b.last_report_at)
					if (a > b) {
						return -1
					} else if (a < b) {
						return 1
					} else {
						return 0
					}
				})
				res.forEach((item, index) => {
					if (index === 1) {
						console.log("manier 2 " + JSON.stringify(item))
					}
					var lastReportAt = moment.tz(new Date(item.last_report_at), "Europe/Amsterdam").format()
					item.last_report_at = lastReportAt
					data.push(item)
				})
				resolve(data)
			}

			var log = () => { console.log("einde " + data.length) }

			database.init().then(database.connect).then(database.get).then(print).then(log)
		})
		
	}

}

module.exports = solar 

