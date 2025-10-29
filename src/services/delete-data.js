import { apiConfig } from "./api-config"

export async function scheduleDelete({ id }) {
	if (process.env.NODE_ENV === "production") {
		return
	}

	try {
		await fetch(`${apiConfig.baseURL}/schedules/${id}`, {
			method: "DELETE",
		})
		alert("Appointment successfully canceled")
	} catch (error) {
		console.log(error)
		alert("Unable to cancel the appointment")
	}
}
