import { getDateStr, getTimeStr } from './date-utils';
import { SelectComponent } from '../components/crud-input';


const thString = {
	cellRender: str => str
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
	cellRenderHTML(email, meta) {
		if (!email) return '';
		if (!email.match(/^[a-zA-Z0-9\.\-]+@[a-zA-Z0-9\.\-]+$/)) return null;
		let parts = email.split('@');
		let sepEmail = parts[0] + '\u200B@' + parts[1];
		return '<a href="mailto:' + email + '" target="_blank">' + sepEmail + '</a>';
	}
};

const thSelect = {
	cellRender(str, meta) {
		if (!meta.listData) return 'ERROR: missing listData';
		if (!str) return '';
		for (let item of meta.listData)
			if (str == item.value) return item.label;
		return '';
	},
	component: SelectComponent
};


export default {
	string: thString,
	date: thDate,
	time: thTime,
	email: thEmail,
	select: thSelect
};
