const request = require("request")
const Q = require("q")
const config = require("../config/config")
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
			console.log("Message post " + text)
			var botname = "@zonnepanelen.bot"
			var token = "517037607:AAEggnpbEmUU-2GVuxX3I3L9FVEAM5ZvA7Q"
				
			var method = "getMe" // user info
			var method2 = "sendMessage" // versturen bericht
			var method1 = "getUpdates" // achterhalen chatid
			var chatId = "68110935"

			var getMeURL = "https://api.telegram.org/bot517037607:AAEggnpbEmUU-2GVuxX3I3L9FVEAM5ZvA7Q/getMe"
			var sendMessageURL = "https://api.telegram.org/bot517037607:AAEggnpbEmUU-2GVuxX3I3L9FVEAM5ZvA7Q/sendMessage"
			var fullUrl = "https://api.telegram.org/bot" + token + "/" + method2 + "?" + "chat_id=" + chatId + "&text=" + text  

			request(fullUrl, function(error, result, body) {
				if (error) {
					console.log(error)
				} else {
					var data = JSON.parse(body)
					console.log(data)
				}
			})
		})
	}

}

module.exports = message