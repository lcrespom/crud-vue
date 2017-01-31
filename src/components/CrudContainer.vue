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
import { routerData, setRoute } from '../utils/router';
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
			runApi(cfg, rdata.route, this, rdata.mode, rdata.extra);
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
			console.log('Edit:', JSON.stringify(row, null, 2));
			this.formData = row;
			setRoute(null, this.routerData.route + '/' + row._id);
		},
		removeRow(row) {
			console.log('Remove:', JSON.stringify(row, null, 2));
		},
		submitForm(formData) {
			console.log('Submit:', formData);
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