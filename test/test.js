var database = require("./database/database");
var moment = require('moment-timezone');

var url = "mongodb://localhost:27017/";

// variant 1
//const connect = database.connect(url)
//connect.then((result) => { console.log(result) })

// variant 2
/*
connect.then((result) => { 
	database.get(result) 
}).then((data) => { console.log("einde") })
*/
var date = new Date().getTime()
console.log(date)
var x = moment.tz(date, "Europe/Amsterdam").format()
console.log(x)

//console.log(moment().tz(new Date().getTime()))
var print = (data) => {
	data.sort((a,b) => {
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
	data.forEach((item) => {
		console.log(moment.tz(new Date(item.last_report_at), "Europe/Amsterdam").format())
	})
}

var log = () => { console.log("einde") }

database.init().then(database.connect).then(database.get).then(print).then(log)
