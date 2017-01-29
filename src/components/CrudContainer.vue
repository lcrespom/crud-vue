<template>
	<div>
		<div v-if="routerData.route=='/'">
			<h2>Welcome</h2>
		</div>
		<template v-else-if="tableConfig">
			<!--<h2>Title</h2>-->
			<crud-table :config="tableConfig" :data="tableData" @edit="editRow" @remove="removeRow" />
		</template>
		<span v-else>No config for {{routerData.route}}</span>
		<!--<p>Current route: {{routerData.route}}</p>-->
	</div>
</template>

<script>
import { routerData } from '../utils/router';
import CrudTable from './CrudTable';

function getTableData() {
	return [
		{ id: 1, date: '20/01/17', description: 'Electricity', amount: 200, balance: 1000 },
		{ id: 2, date: '21/01/17', description: 'Gas', amount: 300, balance: 800 },
		{ id: 3, date: '22/01/17', description: 'Phone', amount: 100, balance: 400 },
		{ id: 4, date: '23/01/17', description: 'Water', amount: 50, balance: 350 }
	];
}

const container = {
	components: { CrudTable },
	props: ['config'],
	data: _ => ({
		routerData,
		tableData: getTableData()
	}),
	computed: {
		tableConfig() {
			return this.config[this.routerData.route.slice(1)];
		}
	},
	methods: {
		editRow(row) {
			console.log('Edit:', JSON.stringify(row, null, 2));
		},
		removeRow(row) {
			console.log('Remove:', JSON.stringify(row, null, 2));
		}
	}
};
export default container;
</script>

<style>
</style>