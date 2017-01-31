// import typeHandlers from '../utils/types';
import { getNestedField, setNestedField } from '../utils/cmp-helpers';
import { getMetaProp } from '../utils/config';

const InputComponent = {
	template: '<input class="form-control" v-model="data">',
	props: ['data']
};

export default {
	functional: true,
	props: ['data', 'field', 'config'],
	render: function (h, ctx) {
		let fld = getNestedField(ctx.props.data, ctx.props.field);
		let meta = ctx.props.config.meta[ctx.props.field] || {};
		let cmp = getMetaProp(meta, 'component') || InputComponent;
		// return h('input', {
		// 	directives: [{
		// 		name: "model",
		// 		rawName: "v-model",
		// 		value: fld,
		// 		expression: "data[field]"
		// 	}],
		// 	staticClass: "form-control",
		// 	domProps: {
		// 		value: _toString(fld)
		// 	},
		// 	on: {
		// 		input: function ($event) {
		// 			if ($event.target.composing) return;
		// 			let fld = $event.target.value;
		// 			setNestedField(ctx.props.data, ctx.props.field, fld);
		// 		}
		// 	}
		// });
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