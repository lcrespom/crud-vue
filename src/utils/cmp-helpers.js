export function validateTypes(cname, pname, prop, reqs) {
	function reject(msg) {
		console.error(`Error in property "${pname}" of component ${cname}: ${msg}`);
		return false;
	}
	function typeOf(obj) {
		return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1];
	}
	for (let k of Object.keys(reqs)) {
		if (reqs[k].required && !prop[k])
			return reject(`property "${k}" is required`);
		if (!prop[k]) continue;
		if (reqs[k].type && typeOf(prop[k]) != reqs[k].type)
			return reject(`property "${pname}.${k}" should be of type ${reqs[k].type}`);
	}
	return true;
}

export function getNestedField(obj, path) {
	return path.split('.').reduce(
		(prev, curr) => prev ? prev[curr] : undefined,
		obj
	);
}

export function setNestedField(obj, path, value) {
	let parts = path.split('.');
	let last = parts.pop();
	let parent = parts.reduce(
		(prev, curr) => {
			if (prev[curr] === undefined)
				prev[curr] = {};
			return prev[curr];
		},
		obj
	);
	if (parent) parent[last] = value;
}


export function ucfirst(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function wrapAsyncFunction(before, asyncF, after) {
	return function(...params) {
		before(...params);
		return asyncF(...params)
		.then(x => {
			after(...params);
			return x;
		})
		.catch(x => {
			after(...params);
			throw x;
		});
	};
}
