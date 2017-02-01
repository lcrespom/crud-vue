import { getNestedField, setNestedField } from '../utils/cmp-helpers';
import { getMetaProp } from '../utils/config';
import typeHandlers from '../utils/types';


function emitInput(evt) {
	if (evt.target.composing) return;
	this.$emit('input', evt.target.value);
}

export const InputComponent = {
	template: '<input class="form-control" :value="data" @input="emitInput">',
	props: ['data'],
	methods: { emitInput }
};

export const SelectComponent = {
	template: `
		<select class="form-control" @input="emitInput">
			<option value=""></option>
			<option v-for="option of meta.listData"	:value="option.value"
				:selected="option.value == data">{{option.label}}</option>
		</select>
	`,
	props: ['data', 'meta'],
	methods: { emitInput }
};

export const TextAreaComponent = {
	template: '<textarea class="form-control" @input="emitInput">{{data}}</textarea>',
	props: ['data'],
	methods: { emitInput }
};

export default {
	props: ['data', 'field', 'config', 'focus'],
	mounted() {
		if (this.focus || this.fokus) this.$el.focus();
	},
	data() {
		return { fokus: false };
	},
	render(h) {
		let fld = getNestedField(this.data, this.field);
		let meta = this.config.meta[this.field] || {};
		this.fokus = this.fokus || getMetaProp(meta, 'focus');
		let cmp = getMetaProp(meta, 'component') || InputComponent;
		return h(cmp, {
			props: { data: inputRender(fld, meta), meta },
			attrs: getAttrs(meta.attrs, meta.type || 'string'),
			on: { input: v => setNestedField(this.data, this.field, inputParse(v, meta)) }
		});
	}
};

function getAttrs(cfgAttrs, type) {
	let thandler = typeHandlers[type];
	return Object.assign(thandler.attrs || {}, cfgAttrs);
}

function inputRender(val, meta) {
	if (val == null || val == undefined) return '';
	let render = getMetaProp(meta, 'inputRender') ||
		getMetaProp(meta, 'cellRender') || (s => String(s));
	return render(val, meta);
}

function inputParse(val, meta) {
	let parse = getMetaProp(meta, 'parse') || (s => s);
	return parse(val, meta);
}
