const solar = require("../solar/solar")
const momenttz = require("moment-timezone")
const moment = require("moment"),
        dateFormat = "DD-MM-YYYY",
		dateTimeFormat = "DD-MM-YYYY HH:mm:ss"

/**
 * Get solar data
 */
var log = (data) => {
	console.log(data)
	var obj = JSON.parse(data)
	var text = obj.last_report_at * 1000
	
	var date = momenttz.tz(new Date(text), "Europe/Amsterdam").format()
	console.log(date)
	
	var outputDate = moment(date)
	console.log(outputDate.format(dateTimeFormat))
	
}
solar.init().then(solar.getExternalData).then(log)