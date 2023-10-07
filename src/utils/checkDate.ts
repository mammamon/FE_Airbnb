export const checkDate = {
	day: (daySelected, dayData) => {
		const event = new Date(dayData);
		const options = { weekday: 'long' as const };
		const day = event.toLocaleDateString(undefined, options);
		if (daySelected === day) {
			return false;
		} else {
			return true;
		}
	},
	number: () => {
		const now = new Date();
		return now.getDay().toString();
	},
};
