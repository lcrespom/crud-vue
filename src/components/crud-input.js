import { getNestedField, setNestedField } from '../utils/cmp-helpers';
import { getMetaProp } from '../utils/config';

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
	functional: true,
	props: ['data', 'field', 'config'],
	render: function (h, ctx) {
		let fld = getNestedField(ctx.props.data, ctx.props.field);
		let meta = ctx.props.config.meta[ctx.props.field] || {};
		let cmp = getMetaProp(meta, 'component') || InputComponent;
		return h(cmp, {
			props: { data: _toString(fld), meta },
			on: { input: v => setNestedField(ctx.props.data, ctx.props.field, v) }
		});
	}
};

function _toString(val) {
	return val == null
		? ''
		: typeof val === 'object'
			? JSON.stringify(val, null, 2)
			: String(val);
}


/* select:
<select class="form-control" name="ride_driver">
	<option value=""></option>
	<option value="2">
		María García - 23
	</option><option value="4">
		Andrés Ríos - 23
	</option><option value="1">
		Miguel Pérez - 32
	</option><option value="3">
		Raúl Ramírez - 53
	</option>
</select>
*/