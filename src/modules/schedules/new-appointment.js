import dayjs from "dayjs"
import IMask from "imask"

import { scheduleNew } from "../../services/post-data.js"
import { dailySchedulesHome } from "./load-home.js"

const newAppntBkg = document.querySelector(".new-schedule-bkg")
const form = document.querySelector("form")
const tutorName = document.querySelector("#appnt-tutor-name")
const petName = document.querySelector("#appnt-pet-name")
const phone = document.querySelector("#appnt-phone")
const serviceDescription = document.querySelector("#appnt-service")
const date = document.querySelector("#appnt-date")
const time = document.querySelector("#appnt-time")

const phoneMaskOptions = {
	mask: [{ mask: "(00) 0 0000-0000" }],
}

IMask(phone, phoneMaskOptions)

const newAppntBtn = document.querySelector(".schedule-btn")
newAppntBtn.addEventListener("click", () => {
	toggleNewAppntScreen(true)
})
const closeNewAppntBtn = document.querySelector(".close-new-schedule")
closeNewAppntBtn.addEventListener("click", () => {
	toggleNewAppntScreen(false)
})

form.onsubmit = async (event) => {
	event.preventDefault()

	if (!tutorName.value.trim()) {
		return alert("Please enter the owner's name")
	}
	if (!petName.value.trim()) {
		return alert("Please enter the pet's name")
	}
	if (!serviceDescription.value.trim()) {
		return alert("Please enter the service")
	}
	if (!phone.value.trim()) {
		return alert("Please enter the phone number")
	}
	if (date.value < dayjs().format("YYYY-MM-DD")) {
		return alert("Please select a valid date")
	}
	if (time.value < dayjs().format("HH:mm")) {
		return alert("Please select a valid time")
	}

	//Save the new schedule
	await scheduleNew({
		tutorName: tutorName.value,
		petName: petName.value,
		service: serviceDescription.value,
		phone: phone.value,
		date: date.value,
		time: time.value,
	})

	//Update the home page with the new schedules
	await dailySchedulesHome()

	tutorName.value = ""
	petName.value = ""
	phone.value = ""
	serviceDescription.value = ""
	date.value = ""
	time.value = ""

	toggleNewAppntScreen(false)
}

async function toggleNewAppntScreen(mode) {
	if (mode) {
		newAppntBkg.classList.remove("hidden")
		window.scrollTo(0, 0)
	} else {
		newAppntBkg.classList.add("hidden")
	}
}
