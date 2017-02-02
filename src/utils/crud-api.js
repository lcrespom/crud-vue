import 'whatwg-fetch';

const crudApi = {
	getAll(apicfg, route) {
		return fetch(getURL(apicfg, 'getAll', route))
		.then(response => response.json());
	},

	post(apicfg, route, data) {
		return fetch(getURL(apicfg, 'post', route), {
			method: 'POST',
			body: JSON.stringify(data),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
		.then(response => response.json());
	},

	put(apicfg, route, data) {
		console.error('Not implemented');
	}
};

function getURL(apicfg, name, route) {
	let suffix = apicfg[name] ? apicfg[name] : route;
	return apicfg.prefix + suffix;
}

export default crudApi;
