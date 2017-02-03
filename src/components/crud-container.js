import { routerData, setRoute, backRoute } from '../utils/router';
import { prepareConfig } from '../utils/config';
import CrudTable from './CrudTable';
import CrudForm from './CrudForm';
import CrudPopup from './CrudPopup';


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
	return api.getAll(cfg.api, route)
	.then(json => vm.tableData = json.data ? json.data : json);
}

const restAPI = {
	getAll: CrudPopup.helpers.wrapWithLoading(apiGetAll,
		cfg => `<h3 style="text-align: center">Loading ${cfg.title}...</h3>`),
	post: (cfg, route, data) => cfg.api.handler.post(cfg.api, route, data),
	put: (cfg, route, data) => cfg.api.handler.put(cfg.api, route, data),
	delete: (cfg, route, data) => cfg.api.handler.delete(cfg.api, route, data)
};


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
		title: '',
		refreshct: 0
	}),
	computed: {
		cfg() {
			let rdata = this.routerData;
			this.refreshct;	// This is just a trick to ensure view refresh
			let cfg = this.config[rdata.routeName];
			if (rdata.mode == 'table')
				restAPI.getAll(cfg, rdata.route, this);
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
			restAPI.delete(this.cfg, this.routerData.route, row._id)
			.then(_ => this.refreshct++);
		},
		submitForm(formData) {
			let apiFunc = this.routerData.mode == 'form-edit' ? restAPI.put : restAPI.post;
			apiFunc(this.cfg, this.routerData.route, formData)
			.then(_ => backRoute());
		}
	}
};

export default container;
