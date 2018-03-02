const request = require("request")
const Q = require("q")
const config = require("../config/config")
const nconf = require("nconf")
const momenttz = require("moment-timezone")
const moment = require("moment"),
        dateFormat = "DD-MM-YYYY",
		dateTimeFormat = "DD-MM-YYYY HH:mm:ss"

var message = {

	init: function(data) {
		console.log("Message init")
		return Q.promise((resolve, reject) => {
			config.loadConfig()
			resolve(data)
		})
	},
	
	send: function(data) {
		return Q.promise((resolve, reject) => {
			console.log("Message send data")
			this.init(data).then(this.format).then(this.post)
		})
	},
	
	format: function(data) {
		return Q.promise((resolve, reject) => {
			console.log("Message format data")
			var text = ""
			for (var prop in data) {
				var propData
				// TODO extract hardcode attribute names
				if (prop === "operational_at" || prop === "last_report_at" || prop === "last_interval_end_at") {
					var time = data[prop] * 1000
					// TODO extract time zone
					var date = momenttz.tz(new Date(time), "Europe/Amsterdam").format()
					propData = moment(date).format(dateTimeFormat)
				} else if (prop === "summary_date") {
					var time = moment(new Date(data[prop]))
					propData = time.format(dateFormat);
				} else {
					propData = data[prop]
				}
				text = text + prop + "\t " + propData + "\n";
			}
			resolve(text)
		})
	},
	
	post: function(text) {
		return Q.promise((resolve, reject) => {
			console.log("Message post")
			
			var token = nconf.get("messagetoken")
			var method = nconf.get("messagemethod")
			var chatId = nconf.get("messagechatid")
			var url = nconf.get("messageurl")

			var fullUrl = url + token + "/" + method + "?" + "chat_id=" + chatId + "&text=" + text  
		
			if (token && method && chatId && url) {
				request(fullUrl, function(error, result, body) {
					if (error) {
						console.log(error)
						reject(new Error(error))
					} else {
						var data = JSON.parse(body)
						resolve()
					}
				})
			} else {
				reject(new Error("Message configuration invalid"))
			}
		})
	}

}

module.exports = message