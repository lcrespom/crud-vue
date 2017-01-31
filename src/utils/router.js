export const routerData = {
	route: window.location.pathname,
	routeName: '',
	mode: '',
	extra: null
};

export function setRoute(event, href) {
	if (event) event.preventDefault();
	routerData.route = href;
	window.history.pushState(
		null,
		'', // routes[this.href],
		href
	);
	updateRouterData();
}

export function backRoute() {
	window.history.back();
}

function parseRoute(route) {
	// ToDo: add app prefix support
	let parts = route.split('/');
	let end = parts.pop();
	let prev = parts.pop();
	if (end == 'new') return [prev, 'form-new'];
	if (prev) return [prev, 'form-edit', end];
	return [end, 'table'];
}

function updateRouterData() {
	let [name, mode, extra] = parseRoute(routerData.route);
	routerData.routeName = name;
	routerData.mode = mode;
	routerData.extra = extra;
}

window.addEventListener('popstate', () => {
	routerData.route = window.location.pathname;
	updateRouterData();
});

updateRouterData();