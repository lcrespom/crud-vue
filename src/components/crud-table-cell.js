import typeHandlers from '../utils/types';


export default {
	functional: true,
	props: ['row', 'col', 'meta'],
	render: function (h, context) {
		let props = context.props;
		let fld = getNestedField(props.row, props.col);
		let text = getFormattedField(fld, props.meta[props.col]);
		return h('td', text);
	}
};


function getNestedField(obj, path) {
	return path.split('.').reduce(
		(prev, curr) => prev ? prev[curr] : undefined,
		obj
	);
}

function getFormattedField(fld, meta) {
	let cellRender = null;
	let cellRenderHTML = null;
	if (meta) {
		cellRender = cellRender || meta.cellRender;
		cellRenderHTML = cellRenderHTML || meta.cellRenderHTML;
	}
	if (!cellRender || !cellRenderHTML) {
		let type = meta && meta.type ? meta.type : 'string';
		let thandler = typeHandlers[type];
		cellRender = cellRender || thandler.cellRender || (str => str);
		cellRenderHTML = cellRenderHTML || thandler.cellRenderHTML;
	}
	// ToDo: if cellRenderHTML exists, use it. If it returns null, use cellRender.
	return cellRender(fld, meta);
}