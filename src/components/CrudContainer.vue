<template>
	<div>
		<!-- Generic home -->
		<div v-if="routerData.route=='/'">
			<h2>Welcome</h2>
		</div>
		<!-- Route found -->
		<template v-else-if="cfg">
			<!-- Table -->
			<template v-if="routerData.mode == 'table'">
				<div class="entity-title-box">
					<h2 class="entity-title">{{title}}</h2>
					<crud-top-table-buttons :route="routerData.route"/>
				</div>
				<crud-table :config="cfg.table" :data="tableData" @edit="editRow" @remove="removeRow" />
			</template>
			<!-- Form -->
			<template v-else>
				<div class="entity-title-box">
					<h2 class="entity-title">{{title}}</h2>
				</div>
				<crud-form :config="cfg.form" :data="formData" />
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
import CrudForm from './CrudForm';


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
		cfg.table.title = cfg.table.title || cfg.title;
		cfg.table.fields = cfg.table.fields || cfg.fields;
		cfg.table.labels = cfg.table.labels || cfg.labels || fields2labels(cfg.table.fields);
		cfg.table.buttons = cfg.table.buttons || cfg.buttons || [];
		// Form
		cfg.form = cfg.form || {};
		cfg.form.editTitle = cfg.form.editTitle || cfg.title;
		cfg.form.newTitle = cfg.form.newTitle || cfg.title;
		cfg.form.fields = cfg.form.fields || cfg.fields;
		cfg.form.labels = cfg.form.labels || cfg.labels || fields2labels(cfg.form.fields);
		// Meta
		cfg.meta = cfg.meta || {};
		cfg.table.meta = cfg.meta;
		cfg.form.meta = cfg.meta;
	}
}

function getTitle(mode, cfg) {
	switch (mode) {
	case 'table': return cfg.table.title;
	case 'form-new': return cfg.form.newTitle;
	case 'form-edit': return cfg.form.editTitle;
	default:
		console.error('Invalid route mode:', mode);
		return '<ERROR>';
	}
}

function runApi(cfg, route, vm, mode, id) {
	if (!cfg) return;
	let api = cfg.api.handler;
	console.log(`>>> api.getAll('${route}')`);
	vm.tableData = [];
	// ToDo: open "Loading..." popup
	api.getAll(cfg.api, route)
	.then(json => vm.tableData = json);
}


let CrudTopTableButtons = {
	template: `
		<span class="table-title-buttons">
			<button accesskey="B" class="btn btn-info">
				<span aria-hidden="true" class="glyphicon glyphicon-search"></span>
				Search
			</button>
			&nbsp;
			<a class="btn btn-primary" @click="newRow" :href="route + '/new'">
				<span aria-hidden="true" class="glyphicon glyphicon-plus"></span>
				New
			</a>
		</span>
	`,
	props: ['route'],
	methods: {
		newRow(event) {
			setRoute(event, this.route + '/new');
		}
	}
};


const container = {
	components: { CrudTable, CrudTopTableButtons, CrudForm },
	props: ['config'],
	created() {
		prepareConfig(this.config);
	},
	data: _ => ({
		routerData,
		tableData: [],
		formData: {},
		title: ''
	}),
	computed: {
		cfg() {
			let rdata = this.routerData;
			let cfg = this.config[rdata.routeName];
			runApi(cfg, rdata.route, this, rdata.mode, rdata.extra);
			this.title = getTitle(rdata.mode, cfg);
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
.entity-title {
	display: inline;
}
.entity-title-box {
	margin-bottom: 1em;
}
.table-title-buttons {
	float: right;
}
</style>