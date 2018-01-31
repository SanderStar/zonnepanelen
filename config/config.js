var nconf = require("nconf");
var Q = require("q");

nconf.argv().env();

// Development
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "localhost" || process.env.NODE_ENV === undefined) {
	console.log('Loading dev config');
	nconf.file("environment", "./config/dev/main.json");
}

// Test
if (process.env.NODE_ENV === "test") {
	console.log('Loading tst config');
	nconf.file("environment", "./config/tst/main.json");
}

// Production
if (process.env.NODE_ENV === "production") {
	console.log('Loading prd config');
	nconf.file("environment", "./config/prd/main.json");
}

var config = {
	loadConfig: function() {
		var deferred = Q.defer();
		nconf.load(deferred.makeNodeResolver());
		return deferred.promise;
	}
};

module.exports = config;