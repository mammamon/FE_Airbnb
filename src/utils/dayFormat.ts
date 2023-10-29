import dayjs from "dayjs"

export const dayFormat = {
	getDay:(date:string|dayjs.Dayjs)=>{
	return	dayjs(date).get('date')},
	getMont:(date:string|dayjs.Dayjs)=>{
	return	dayjs(date).get('month')},
	getYear:(date:string|dayjs.Dayjs)=>{
	return	dayjs(date).get('year')},
	printDate:(date:string|dayjs.Dayjs)=>{
	return	`Ngày ${dayFormat.getDay(date)} tháng ${dayFormat.getMont(date)} năm ${dayFormat.getYear(date)}`
	}
}

