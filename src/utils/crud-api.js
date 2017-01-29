import 'whatwg-fetch';

const crudApi = {
	getAll(apicfg, route) {
		let url = apicfg.prefix + apicfg.getAll;
		return fetch(url)
		.then(response => response.json());
	}
};

export default crudApi;
