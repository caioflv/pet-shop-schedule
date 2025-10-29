import { apiConfig } from "./api-config.js"

export async function scheduleNew({ tutorName, petName, date, time, service }) {
	if (process.env.NODE_ENV === "production") {
		return
	}

	try {
		await fetch(`${apiConfig.baseURL}/schedules`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				tutorName,
				petName,
				date,
				time,
				service,
			}),
		})
	} catch (error) {
		console.log(error)
		alert(error)
	}
}
