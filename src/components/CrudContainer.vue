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
					<crud-top-table-buttons @new="newRow"/>
				</div>
				<crud-table :config="cfg.table" :data="tableData" @edit="editRow" @remove="removeRow" />
			</template>
			<!-- Form -->
			<template v-else>
				<div class="entity-title-box">
					<h2 class="entity-title">{{title}}</h2>
				</div>
				<crud-form :config="cfg.form" :data="formData" @submit="submitForm"/>
			</template>
		</template>
		<!-- No route found -->
		<span v-else>No config for {{routerData.route}}</span>
	</div>
</template>

<script>
import { routerData, setRoute, backRoute } from '../utils/router';
import { prepareConfig } from '../utils/config';
import CrudTable from './CrudTable';
import CrudForm from './CrudForm';


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

function apiGetAll(cfg, route, vm) {
	if (!cfg) return;
	let api = cfg.api.handler;
	vm.tableData = [];
	// ToDo: open "Loading..." popup
	api.getAll(cfg.api, route)
	.then(json => vm.tableData = json.data ? json.data : json);
}

function apiPost(cfg, route, data) {
	let api = cfg.api.handler;
	return api.post(cfg.api, route, data);
}

function apiPut(cfg, route, data) {
	let api = cfg.api.handler;
	return api.put(cfg.api, route, data);
}

function apiDelete(cfg, route, id) {
	let api = cfg.api.handler;
	return api.delete(cfg.api, route, id);
}


let CrudTopTableButtons = {
	template: `
		<span class="table-title-buttons">
			<button accesskey="B" class="btn btn-info">
				<span aria-hidden="true" class="glyphicon glyphicon-search"></span>
				Search
			</button>
			&nbsp;
			<a class="btn btn-primary" @click="$emit('new')">
				<span aria-hidden="true" class="glyphicon glyphicon-plus"></span>
				New
			</a>
		</span>
	`
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
			if (rdata.mode == 'table')
				apiGetAll(cfg, rdata.route, this);
			if (cfg)
				this.title = getTitle(rdata.mode, cfg);
			return cfg;
		}
	},
	methods: {
		newRow(event) {
			this.formData = {};
			setRoute(event, this.routerData.route + '/new');
		},
		editRow(row) {
			this.formData = row;
			setRoute(null, this.routerData.route + '/' + row._id);
		},
		removeRow(row) {
			apiDelete(this.cfg, this.routerData.route, row._id)
			.then(_ => this.$forceUpdate());//TODO make this work
		},
		submitForm(formData) {
			let apiFunc = this.routerData.mode == 'form-edit' ? apiPut : apiPost;
			apiFunc(this.cfg, this.routerData.route, formData)
			.then(_ => backRoute());
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