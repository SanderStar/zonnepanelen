var object = {"system_id":67,"modules":31,"size_w":7690,"current_power":0,"energy_today":0,"energy_lifetime":89506645,"summary_date":"2018-02-22","source":"meter","status":"normal","operational_at":1201362300,"last_report_at":1519306654,"last_interval_end_at":1519306200}

for (var prop in object) {
	console.log(prop + "\t " + object[prop]);
	
	if (prop === "operational_at") {
		var date = new Date(object[prop])
		console.log(date)
	}
	//last_report_at  1519307289
	//last_interval_end_at
}

