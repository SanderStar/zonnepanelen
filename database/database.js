const mongoClient = require("mongodb").MongoClient
const config = require("../config/config")
const nconf = require("nconf")
const Q = require("q")


var database = {

	init: function() {
		return Q.promise((resolve, reject) => {
			console.log("Database init")
			config.loadConfig()
			resolve()
		})
	},

	get: function() {
		console.log("Database get")
		var select = function() {
			console.log("Database select")
			var url = nconf.get("databaseurl")
			var schema = nconf.get("databaseschema")

			console.log("Database schema " + schema)
			mongoClient.connect(url, function(err, db) {
				if (err) {
					console.log(err)
				}
				var dbo = db.db(schema)
				dbo.collection("summary").find().toArray(function(err, res) {
					console.log("Database find")
					if (err) {
						console.log(err)
					}
					res.forEach(function(item) {
						console.log(item)
					})
					console.log("documents selected " + res.length)
					db.close()
				})
			})
		}
		
		this.init().then(select())
	},
	
	connect: function() {
		return Q.promise(function(resolve, reject) {
			console.log("Database connect")
			var url = nconf.get("databaseurl")
			mongoClient.connect(url, (err, database) => {
				if (err) {
					console.log(err)
					reject(new Error(err))
				} else {
					console.log("Database connect success")
					resolve(database)
				}
			})
		})
	},
	
	getX: function(database) {
		return Q.promise(function(resolve, reject) {
			console.log("Database get")
			var schema = nconf.get("databaseschema")
			var dbo = database.db(schema)
			dbo.collection("summary").find().toArray((err, res) => {
				console.log("Database find")
				if (err) {
					console.log(err)
					reject(new Error(err))
				}
				console.log("documents selected " + res.length)
				database.close()
				resolve(res)
			})
		})
	},
	
	add: function(data) {
	
		var insert = function() {
			var url = nconf.get("databaseurl")
			var schema = nconf.get("databaseschema")

			mongoClient.connect(url, function(err, db) {
				if (err) {
					console.log(err)
				}
				var dbo = db.db(schema)
				dbo.collection("summary").insertOne(data, function(err, res) {
					if (err) {
						console.log(err)
					}
					console.log("document inserted")
					db.close()
				})
			})
		}
		
		this.init().then(insert())
	}
}

module.exports = database