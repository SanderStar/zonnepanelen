const request = require("request")

// https://api.telegram.org/bot<token>/METHOD_NAME

var botname = "@zonnepanelen.bot"
var token = "517037607:AAEggnpbEmUU-2GVuxX3I3L9FVEAM5ZvA7Q"
	
var method = "getMe" // user info
var method2 = "sendMessage" // versturen bericht
var method1 = "getUpdates" // achterhalen chatid
var chatId = "68110935"
var text = "Helloworld"

var getMeURL = "https://api.telegram.org/bot517037607:AAEggnpbEmUU-2GVuxX3I3L9FVEAM5ZvA7Q/getMe"
var sendMessageURL = "https://api.telegram.org/bot517037607:AAEggnpbEmUU-2GVuxX3I3L9FVEAM5ZvA7Q/sendMessage"
var fullUrl = "https://api.telegram.org/bot" + token + "/" + method2 + "?" + "chat_id=" + chatId + "&text=" + text  

console.log(fullUrl)


request(fullUrl, function(error, result, body) {
	if (error) {
		console.log(error)
	} else {
		var data = JSON.parse(body)
		console.log(data)
	}
})