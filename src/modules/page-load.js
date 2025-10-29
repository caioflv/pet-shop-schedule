import dayjs from "dayjs"
import { dailySchedulesHome } from "./schedules/load-home"

document.addEventListener("DOMContentLoaded", () => {
	dailySchedulesHome(dayjs(new Date()).format("YYYY-MM-DD"))
})
