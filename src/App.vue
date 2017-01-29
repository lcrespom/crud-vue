<template>
	<div id="app">
		<!-- Top navbar -->
		<nav class="navbar navbar-inverse navbar-static-top">
			<div class="container-fluid">
				<div class="navbar-header">
					<a class="navbar-brand" href="#">The CRUD Library</a>
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
						<crud-table :config="tableConfig" :data="tableData" @edit="editRow" @remove="removeRow" />
						<crud-container />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CrudTable from './components/CrudTable';
import CrudMenu from './components/CrudMenu';
import CrudContainer from './components/CrudContainer';
import { routerData } from './utils/router';

function getTableConfig() {
	const TABLE_FIELDS = ['date', 'description', 'amount', 'balance'];
	let { editButton, removeButton } = CrudTable.helpers;
	return {
		fields: TABLE_FIELDS,
		buttons: [editButton, removeButton]
	};
}

function getTableData() {
	return [
		{ id: 1, date: '20/01/17', description: 'Electricity', amount: 200, balance: 1000 },
		{ id: 2, date: '21/01/17', description: 'Gas', amount: 300, balance: 800 },
		{ id: 3, date: '22/01/17', description: 'Phone', amount: 100, balance: 400 },
		{ id: 4, date: '23/01/17', description: 'Water', amount: 50, balance: 350 }
	];
}

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
		CrudMenu, CrudTable, CrudContainer
	},
	data: _ => ({
		tableConfig: getTableConfig(),
		tableData: getTableData(),
		menuItems: getMenuItems(),
		routerData
	}),
	methods: {
		editRow(row) {
			console.log('Edit:', JSON.stringify(row, null, 2));
		},
		removeRow(row) {
			console.log('Remove:', JSON.stringify(row, null, 2));
		}
	}
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
