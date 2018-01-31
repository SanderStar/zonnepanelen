const request = require("request")

module.exports = {
		
	summary: function() {
		console.log("summary testing " + new Date())
		console.log("Getting solar panel data")
		// TODO eigen specs
		var url = "https://api.enphaseenergy.com/api/v2/systems/1338274/summary?key=97bd72a51ce15f497cef4eb553117b75&user_id=4d5455324d446b774f413d3d0a"
		// TODO test specs
		url = "https://api.enphaseenergy.com/api/v2/systems/67/summary?key=96a7de32fabc1dd8ff68ec43eca21c06&user_id=4d7a45774e6a41320a"
		request(url, function(error, result, body) {
			console.log("error " + error) 
			console.log("result " + result)
			console.log("body " + body)
		})
	}	
	
}