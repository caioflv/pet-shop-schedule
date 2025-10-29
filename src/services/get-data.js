import { apiConfig } from "./api-config"

export async function getSchedulesByDate(date) {
	try {
		let data = "[]"
		let toJson = "[]"

		if (process.env.NODE_ENV === "production") {
			data = await fetch("./server.json")
			toJson = await data.json()
			console.log(toJson)
			toJson = toJson.schedules
		} else {
			data = await fetch(`${apiConfig.baseURL}/schedules?date=${date}`)
			toJson = await data.json()
		}
		// data = await fetch("./server.json")

		console.log(toJson)

		return toJson
	} catch (error) {
		console.log(error)
		alert(error)
	}
}
