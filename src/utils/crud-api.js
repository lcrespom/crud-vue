import 'whatwg-fetch';

const crudApi = {
	getAll(apicfg, route) {
		return fetch(getURL(apicfg, 'getAll', route))
		.then(response => response.json());
	},

	post(apicfg, route, data) {
		let url = getURL(apicfg, 'post', route);
		return fetch(url, fetchInit('POST', data))
		.then(response => response.json());
	},

	put(apicfg, route, data) {
		let url = getURL(apicfg, 'post', route);
		return fetch(url + '/' + data._id, fetchInit('PUT', data))
		.then(response => response.json());
	},

	delete(apicfg, route, id) {
		let url = getURL(apicfg, 'post', route);
		return fetch(url + '/' + id, { method: 'DELETE'})
		.then(response => response.json());
	}
};

function getURL(apicfg, name, route) {
	let suffix = apicfg[name] ? apicfg[name] : route;
	return apicfg.prefix + suffix;
}

function fetchInit(method, data) {
	return {
		method,
		body: JSON.stringify(data),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	};
}

export default crudApi;
