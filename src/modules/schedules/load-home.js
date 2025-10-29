import dayjs from "dayjs"

import { getSchedulesByDate } from "../../services/get-data.js"
import { scheduleDelete } from "../../services/delete-data.js"
import { openingHours } from "../../utils/opening-hours.js"

const homeDate = document.getElementById("home-date")
const appntDate = document.querySelector("#appnt-date")
const appntTime = document.querySelector("#appnt-time")

//Today's date
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

//Set default input date value and min value
homeDate.value = inputToday
homeDate.min = inputToday
appntDate.value = inputToday
appntDate.min = inputToday

const periodMorning = document.querySelector(".morning-list")
const periodAfternoon = document.querySelector(".afternoon-list")
const periodNight = document.querySelector(".night-list")

//Both the menu and registration screen calendars synchronize their date and search values
homeDate.onchange = async () => {
	appntDate.value = homeDate.value
	await dailySchedulesHome(homeDate.value)
}
appntDate.onchange = async () => {
	homeDate.value = appntDate.value
	await dailySchedulesHome(appntDate.value)
}

//Fetch schedules by date and update registration allowed times too
export async function dailySchedulesHome(date) {
	const schedules = await getSchedulesByDate(dayjs(date).format("YYYY-MM-DD"))
	showSchedules(schedules)
	newAppntTimeSchedules(schedules)
}

//Populate schedules by time of day
function showSchedules(schedules) {
	periodMorning.innerHTML = ""
	periodAfternoon.innerHTML = ""
	periodNight.innerHTML = ""

	schedules.forEach((schedule) => {
		const item = document.createElement("li")

		const petName = document.createElement("h4")
		const time = document.createElement("h4")

		const tutorName = document.createElement("p")
		const service = document.createElement("p")

		const removeBtn = document.createElement("button")
		removeBtn.type = "button"

		petName.textContent = `${schedule.petName}`
		tutorName.textContent = `/ ${schedule.tutorName}`
		time.textContent = schedule.time
		service.textContent = schedule.service
		removeBtn.textContent = "Remove appointment"
		removeBtn.addEventListener("click", async () => {
			await scheduleDelete({ id: schedule.id })
			await dailySchedulesHome()
		})

		item.appendChild(time)
		item.appendChild(petName)
		item.appendChild(tutorName)
		item.appendChild(service)
		item.appendChild(removeBtn)

		item.setAttribute("data-id", schedule.id)

		const hour = Number(schedule.time.split(":")[0])
		if (hour < 13) {
			periodMorning.appendChild(item)
		} else if (hour < 18) {
			periodAfternoon.appendChild(item)
		} else {
			periodNight.appendChild(item)
		}
	})
}

async function newAppntTimeSchedules(schedules) {
	const available = openingHours.map((hour) => {
		return {
			time: hour,
			available:
				!schedules.some((schedule) => schedule.time === hour) &&
				hour >= dayjs().format("HH:mm"),
		}
	})

	appntTime.innerHTML = ""

	const item = document.createElement("option")
	item.textContent = "Please select"
	item.value = ""
	item.setAttribute("selected", true)
	item.setAttribute("disabled", true)
	item.setAttribute("hidden", true)
	appntTime.appendChild(item)

	available.forEach((element) => {
		const item = document.createElement("option")
		item.textContent = element.time
		item.value = element.time

		if (!element.available) {
			item.style.color = "red"
			item.setAttribute("disabled", true)
		}

		appntTime.appendChild(item)
	})
}
