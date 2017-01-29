<template>
	<div>
		<!-- Generic home -->
		<div v-if="routerData.route=='/'">
			<h2>Welcome</h2>
		</div>
		<!-- Route found -->
		<template v-else-if="cfg">
			<!-- Table -->
			<template v-if="editMode == 'table'">
				<h2 class="entity-title">{{cfg.title}}</h2>
				<span class="table-title-buttons">
					<button accesskey="B" class="btn btn-info">
						<span aria-hidden="true" class="glyphicon glyphicon-search"></span>
						Search
					</button>
					&nbsp;
					<a class="btn btn-primary" @click="newRow" :href="routerData.route + '/new'">
						<span aria-hidden="true" class="glyphicon glyphicon-plus"></span>
						New
					</a>
				</span>
				<crud-table :config="cfg.table" :data="tableData" @edit="editRow" @remove="removeRow" />
			</template>
			<!-- Form -->
			<template v-else>
				ToDo: Form for {{routerData.route}}
			</template>
		</template>
		<!-- No route found -->
		<span v-else>No config for {{routerData.route}}</span>
	</div>
</template>

<script>
import { routerData, setRoute } from '../utils/router';
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
		// Meta
		cfg.meta = cfg.meta || {};
		cfg.table.meta = cfg.meta;
		cfg.form.meta = cfg.meta;
	}
}

function getEditMode(config, route) {
	let parts = route.split('/');
	let end = parts.pop();
	let prev = parts.pop();
	if (end == 'new') return [prev, 'form-new'];
	if (prev && config[prev]) return [prev, 'form-edit', end];
	return [end, 'table'];
}

function runApi(cfg, route, vm, id) {
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
		tableData: [],
		editMode: ''
	}),
	computed: {
		cfg() {
			let [route, mode, id] = getEditMode(this.config, this.routerData.route);
			this.editMode = mode;
			let cfg = this.config[route];
			runApi(cfg, route, this, id);
			return cfg;
		}
	},
	methods: {
		editRow(row) {
			console.log('Edit:', JSON.stringify(row, null, 2));
		},
		removeRow(row) {
			console.log('Remove:', JSON.stringify(row, null, 2));
		},
		newRow(event) {
			setRoute(event, this.routerData.route + '/new');
		}
	}
};
export default container;
</script>

<style>
.entity-title {
	display: inline;
}
.table-title-buttons {
	float: right;
}
</style>