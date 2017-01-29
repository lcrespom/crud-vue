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
	</div>
</template>

<script>
import { routerData } from '../utils/router';
import { ucfirst } from '../utils/cmp-helpers';
import crudApi from '../utils/crud-api';
import CrudTable from './CrudTable';


function fields2labels(fields) {
	if (!fields) return null;
	return fields.map(ucfirst);
}

function prepareConfig(config) {
	for (let entity of Object.keys(config)) {
		if (entity.charAt(0) == '_') continue;
		let cfg = config[entity];
		// API
		cfg.api = cfg.api || {};
		cfg.api.handler = cfg.api.handler || config._apiHandler || crudApi;
		cfg.api.prefix = cfg.api.prefix || config._apiPrefix;
		cfg.api.getAll = cfg.api.getAll || entity;
		cfg.api.put = cfg.api.put || entity;
		cfg.api.post = cfg.api.post || entity;
		cfg.api.delete = cfg.api.delete || entity;
		// Title
		cfg.title = cfg.title || ucfirst(entity);
		// Table
		cfg.table = cfg.table || {};
		cfg.table.fields = cfg.table.fields || cfg.fields;
		cfg.table.labels = cfg.table.labels || cfg.labels || fields2labels(cfg.table.fields);
		cfg.table.buttons = cfg.table.buttons || cfg.buttons || [];
		// Form
		cfg.form = cfg.form || {};
		cfg.form.fields = cfg.form.fields || cfg.fields;
		cfg.form.labels = cfg.form.labels || cfg.labels || fields2labels(cfg.form.fields);
	}
}

function runApi(cfg, route, vm) {
	if (!cfg) return;
	let api = cfg.api.handler;
	console.log(`>>> api.getAll('${route}')`);
	vm.tableData = [];
	// ToDo: open "Loading..." popup
	api.getAll(cfg.api, route)
	.then(json => vm.tableData = json);
}


const container = {
	components: { CrudTable },
	props: ['config'],
	created() {
		prepareConfig(this.config);
	},
	data: _ => ({
		routerData,
		tableData: []
	}),
	computed: {
		cfg() {
			let route = this.routerData.route;
			let cfg = this.config[route.slice(1)];
			runApi(cfg, route, this);
			return cfg;
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