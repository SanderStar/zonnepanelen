const request = require("request")
const config = require("../config/config")
const nconf = require("nconf")
const Q = require("q")
const cache = require("memory-cache")
const database = require("../database/database")
const message = require("../message/message")
const moment = require("moment-timezone")


var solar = {
		
	init: function() {
		return Q.promise((resolve, reject) => {
			console.log("Solar init")
			config.loadConfig()
			resolve()
		})
	},

	summary: function() {
		return Q.promise((resolve, reject) => {
			console.log("Solar summary")
			this.init().then(this.getExternalData).then(this.processData)
		})
	},
	
	getExternalData: function() {
		return Q.promise((resolve, reject) => {
			console.log("Solar get external data")

			var host = nconf.get("solarhost")
			var key = nconf.get("solarkey")
			var system = nconf.get("solarsystem")
			var userid = nconf.get("solaruserid")
			url = host + system + "?" + key + "&" + userid

			request(url, (error, result, body) => {
				if (error) {
					reject(new Error(error))
				} else {
					resolve(body)
				}
			})
		})
	},
	
	processData: function(body) {
		return Q.promise((resolve, reject) => {
			console.log("Solar process data")
			// TODO sometimes error 'undefined' -> check parseble
			var data = JSON.parse(body)
			var id = data.last_report_at
			if (!cache.get(id)) {
				console.log("Solar new data")
				cache.put(id, data)
				//TODO tijdelijk uit database.add(data)
				message.send(data)
			} else {
				console.log("Solar data already cached")
			}
			resolve();
		})
		
	},
	
	getData: function() {
		return Q.promise((resolve, reject) => {
			console.log("Solar get data")

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
					// TODO extract timezone
					var lastReportAt = moment.tz(new Date(item.last_report_at), "Europe/Amsterdam").format()
					item.last_report_at = lastReportAt
					data.push(item)
				})
				resolve(data)
			}
			
			// TODO not needed
			var log = () => { console.log("einde " + data.length) }

			database.init().then(database.connect).then(database.get).then(print).then(log)
		})
		
	}

}

module.exports = solar 

