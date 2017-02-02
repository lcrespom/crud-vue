export const DAY_START = '00:00:00';
export const DAY_END = '23:59:59';

export function parseDateTime(dstr, tstr = DAY_START) {
	let d = new Date();
	// Date
	let dmy = dstr.split('-');
	if (dmy.length != 3) return;
	d.setFullYear(+dmy[0]);
	d.setMonth((+dmy[1]) - 1);
	d.setDate(+dmy[2]);
	// Time
	let hhmm = tstr.split(':');
	if (hhmm.length < 2) return;
	d.setHours(+hhmm[0]);
	d.setMinutes(+hhmm[1]);
	if (hhmm[2])
		d.setSeconds(+hhmm[2]);
	return d;
}

export function getDateStr(d) {
	if (!(d instanceof Date) || isNaN(d.getDate())) return '';
	let year = '' + d.getFullYear();
	let month = prefix0(d.getMonth() + 1);
	let day = prefix0(d.getDate());
	return `${year}-${month}-${day}`;
}

export function getTimeStr(d) {
	if (!(d instanceof Date) || isNaN(d.getHours())) return '';
	let hh = prefix0(d.getHours());
	let mm = prefix0(d.getMinutes());
	return `${hh}:${mm}`;
}

export function sameDay(d1, d2) {
	return d1.getFullYear() == d2.getFullYear()
		&& d1.getMonth() == d2.getMonth()
		&& d1.getDate() == d2.getDate();
}

function prefix0(num) {
	if (num < 10) return '0' + num;
	else return '' + num;
}
