import { getDateStr, getTimeStr, parseDateTime } from './date-utils';
import { SelectComponent } from '../components/crud-input';


const thString = {
	cellRender: str => str
};

const thNumber = {
	cellRender: n => n.toLocaleString(),
	inputRender: n => String(n),
	attrs: { type: 'number' }
};

const thDate = {
	cellRender: (str, meta) => getDateStr(new Date(str)),
	parse: str => parseDateTime(str),
	attrs: { type: 'date' }
};

const thTime = {
	cellRender(str, meta) {
		return getTimeStr(new Date(str));
	}
	// ToDo: implement & test attrs, parsing, etc.
};

const thEmail = {
	cellRenderHTML(email, meta) {
		if (!email) return '';
		if (!email.match(/^[a-zA-Z0-9\.\-]+@[a-zA-Z0-9\.\-]+$/)) return null;
		let parts = email.split('@');
		let sepEmail = parts[0] + '\u200B@' + parts[1];
		return '<a href="mailto:' + email + '" target="_blank">' + sepEmail + '</a>';
	},
	attrs: { type: 'email' }
};

const thSelect = {
	cellRender(str, meta) {
		if (!meta.listData) return 'ERROR: missing listData';
		if (!str) return '';
		for (let item of meta.listData)
			if (str == item.value) return item.label;
		return '';
	},
	inputRender: str => str,
	component: SelectComponent
};


export default {
	string: thString,
	number: thNumber,
	date: thDate,
	time: thTime,
	email: thEmail,
	select: thSelect
};
