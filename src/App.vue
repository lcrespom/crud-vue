<template>
	<div id="app">
		<crud-popup></crud-popup>
		<!-- Top navbar -->
		<nav class="navbar navbar-inverse navbar-static-top">
			<div class="container-fluid">
				<div class="navbar-header">
					<a class="navbar-brand" href="/"><b>The CRUD Library</b></a>
				</div>
			</div>
		</nav>
		<!-- Container form menu and main -->
		<div id="crud-main" class="container-fluid">
			<div class="row">
				<div class="col-sm-3">
					<!-- Menu goes here -->
					<div id="crud-menu" class="well sidebar-nav">
						<crud-menu :items="menuItems" cssClass="nav nav-list" />
					</div>
				</div>
				<div class="col-sm-9">
					<!-- Main goes here -->
					<div id="crud-content" class="well">
						<crud-container :config="appConfig"/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CrudMenu from './components/CrudMenu';
import CrudContainer from './components/CrudContainer';
import CrudPopup from './components/CrudPopup';
import { routerData } from './utils/router';
import appConfig from './app-config';

function getMenuItems() {
	return [
		{ text: 'Books', route: '/books', icon: 'book' },
		{ text: 'Authors', route: '/authors', icon: 'pencil'},
		{ text: 'Members', route: '/members', icon: 'user'},
		{ text: 'Book items', route: '/items', icon: 'list-alt' },
		{ text: 'Rentals', route: '/rentals', icon: 'tag' }
	];
}

export default {
	name: 'app',
	components: {
		CrudMenu, CrudContainer, CrudPopup
	},
	mounted() {
		let popup = CrudPopup.vm;
		popup.open();
		setTimeout(_ => popup.close(), 2000);
	},
	data: _ => ({
		menuItems: getMenuItems(),
		appConfig,
		routerData
	})
};
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
/*#crud-main {}*/
#crud-menu {
	padding: 9px 0;
}
/*#crud-content {}*/
.navbar-header, .navbar-brand {
	width: 100%;
	text-align: center;
}
.navbar-brand {
	color: white !important;
	font-size: 150%;
}
</style>
