const every = require("schedule").every
const config = require("../config/config")
const solar = require("../solar/solar")
const meter = require("../meter/meter")
const nconf = require("nconf")
const Q = require("q")

var schedule = {

	start: function() {
		var init = function() {
			var deferred = Q.defer()
			console.log("Schedule init")
			config.loadConfig()
			return deferred.promise
		}
		
		var schedule = function() {
			var interval = nconf.get("scheduleinterval")
			
			// Schedule data timer
			every(interval).do(function() {
				solar.summary()
				meter.init()
			});
		}
		
		init().then(schedule())
	}
}

module.exports = schedule