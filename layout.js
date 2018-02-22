var object = {"system_id":67,"modules":31,"size_w":7690,"current_power":0,"energy_today":0,"energy_lifetime":89506645,"summary_date":"2018-02-22","source":"meter","status":"normal","operational_at":1201362300,"last_report_at":1519306654,"last_interval_end_at":1519306200}

for (var prop in object) {
	console.log(prop + "\t " + object[prop]);
}

console.log(object.system_id)
console.log(object.modules)
console.log(object.size_w)
console.log(object.current_power)
console.log(object.energy_today)
