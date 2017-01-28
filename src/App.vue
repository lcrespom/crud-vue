<template>
	<div id="app">
		<crud-table :config="tableConfig" :data="tableData" @edit="editRow" @remove="removeRow" />
	</div>
</template>

<script>
import CrudTable from './components/CrudTable';

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

export default {
	name: 'app',
	components: {
		CrudTable
	},
	data: _ => ({
		tableConfig: getTableConfig(),
		tableData: getTableData()
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
	margin: 0 1em;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
