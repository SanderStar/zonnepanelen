var moment = require('moment')

var date = new Date()

var endDay = moment();
console.log(endDay.format("YYYY-MM-DD"))

var startDay = endDay.subtract(1, "days")
console.log(startDay.format("YYYY-MM-DD"))


