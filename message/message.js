const request = require("request")
const moment = require("moment"),
        dateFormat = "DD-MM-YYYY",
		dateTimeFormat = "DD-MM-YYYY hh:mm:ss"

var message = {

	init: function() {
	},

	send: function(data) {
		var botname = "@zonnepanelen.bot"
		var token = "517037607:AAEggnpbEmUU-2GVuxX3I3L9FVEAM5ZvA7Q"
			
		var method = "getMe" // user info
		var method2 = "sendMessage" // versturen bericht
		var method1 = "getUpdates" // achterhalen chatid
		var chatId = "68110935"
		var text = ""
		for (var prop in data) {
			var propData
			// TODO extract hardcode attribute names
			if (prop === "operational_at" || prop === "last_report_at" || prop === "last_interval_end_at") {
				//TODO propData = moment.tz(new Date(data[prop]), "Europe/Amsterdam").format()
				var date = moment(new Date(data[prop]))
				propData = date.format(dateTimeFormat);
			} else if (prop === "summary_date") {
				var date = moment(new Date(data[prop]))
				propData = date.format(dateFormat);
			} else {
				propData = data[prop]
			}
			text = text + prop + "\t " + propData + "\n";
		}
		
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
	}
}

module.exports = message