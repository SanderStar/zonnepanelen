var database = require("./database/database");

var url = "mongodb://localhost:27017/";

// variant 1
//const connect = database.connect(url)
//connect.then((result) => { console.log(result) })

// variant 2
/*
connect.then((result) => { 
	database.getX(result) 
}).then((data) => { console.log("einde") })
*/

var print = (data) => { 				
	data.forEach(function(item) {
		console.log(item)
	})
}

var log = () => { console.log("einde") }

const init = database.init()

init.then(database.connect).then(database.getX).then(print).then(log)
