import { ucfirst } from './cmp-helpers';
import crudApi from './crud-api';
import typeHandlers from './types';


function fields2labels(fields) {
	if (!fields) return null;
	return fields.map(ucfirst);
}

export function prepareConfig(config) {
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

export function getMetaProp(meta = {}, prop) {
	if (meta[prop]) return meta[prop];
	let type = meta.type || 'string';
	let thandler = typeHandlers[type];
	return thandler[prop];
}
