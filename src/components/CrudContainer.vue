<template>
	<div>
		<div v-if="routerData.route=='/'">
			<h2>Welcome</h2>
		</div>
		<template v-else-if="cfg">
			<h2>{{cfg.title}}</h2>
			<crud-table :config="cfg.table" :data="tableData" @edit="editRow" @remove="removeRow" />
		</template>
		<span v-else>No config for {{routerData.route}}</span>
		<!--<p>Current route: {{routerData.route}}</p>-->
	</div>
</template>

<script>
import { routerData } from '../utils/router';
import { ucfirst } from '../utils/cmp-helpers';
import crudApi from '../utils/crud-api';
import CrudTable from './CrudTable';



const container = {
	components: { CrudTable },
	props: ['config'],
	data: _ => ({
		routerData
	}),
	computed: {
		cfg() {
			let name = this.routerData.route.slice(1);
			let cfg = this.config[name];
			if (!cfg) return cfg;
			return {
				title: cfg.title = cfg.title || ucfirst(name),
				table: {
					fields: cfg.tableFields || cfg.fields,
					labels: cfg.tableLabels || cfg.labels,
					buttons: cfg.buttons
				},
				form: {
					fields: cfg.formFields || cfg.fields,
					labels: cfg.formLabels || cfg.labels
				}
			};
		},
		tableData() {
			console.log(`>>> crudApi.getAll('${this.routerData.route}')`);
			return crudApi.getAll(this.routerData.route);
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