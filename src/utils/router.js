export const routerData = {
	route: window.location.pathname
};

export function setRoute(event, href) {
	event.preventDefault();
	routerData.route = href;
	window.history.pushState(
		null,
		'', // routes[this.href],
		href
	);
}

window.addEventListener('popstate', () => {
	routerData.route = window.location.pathname;
});
