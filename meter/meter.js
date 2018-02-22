var moment = require("moment"),
	dateFormat = "YYYY-MM-DD",
	url = "https://enelogic.com/api/measuringpoints"
	accessToken = "access_token=NDg5MTBmODIwM2ZiNjRmMDZhOTZmMzU0OGM2ZTdmYzM2MmVmM2Y0NDMyMDgzOTkwMWQyMGZkYWJiZmNmMWJmMg"

var meter = {

	init: function() {
		var date = new Date()

		var endDay = moment();
		console.log(endDay.format(dateFormat))

		var startDay = endDay.subtract(1, "days")
		console.log(startDay.format(dateFormat))
		
		console.log(url + "?" + accessToken)
	}
}

module.exports = meter