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
			props: { data: _toString(fld), meta },
			attrs: getAttrs(meta.attrs, meta.type || 'string'),
			on: { input: v => setNestedField(this.data, this.field, v) }
		});
	}
};

function getAttrs(cfgAttrs, type) {
	let thandler = typeHandlers[type];
	return Object.assign(thandler.attrs || {}, cfgAttrs);
}

function _toString(val) {
	return val == null
		? ''
		: typeof val === 'object'
			? JSON.stringify(val, null, 2)
			: String(val);
}
