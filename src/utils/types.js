import { getDateStr, getTimeStr } from './date-utils';

const thString = {
	cellRender: str => str,
	inputType: 'text'
};

const thDate = {
	cellRender(str, meta) {
		return getDateStr(new Date(str));
	}
};

const thTime = {
	cellRender(str, meta) {
		return getTimeStr(new Date(str));
	}
};

const thEmail = {
	cellRender(email, meta) {
		if (!email) return '';
		if (!email.match(/^[a-zA-Z0-9\.\-]+@[a-zA-Z0-9\.\-]+$/)) return email;
		let parts = email.split('@');
		let sepEmail = parts[0] + '\u200B@' + parts[1];
		return sepEmail;
		// return '<a href="mailto:' + email + '" target="_blank">' + sepEmail + '</a>';
	}
};

const thSelect = {
	cellRender(str, meta) {
		if (!meta.listData) return 'ERROR: missing listData';
		if (!str) return '';
		for (let item of meta.listData)
			if (str == item.value) return item.label;
		return '';

	}
};


export default {
	string: thString,
	date: thDate,
	time: thTime,
	email: thEmail,
	select: thSelect
};
