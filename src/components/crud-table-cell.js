import typeHandlers from '../utils/types';


export default {
	functional: true,
	props: ['row', 'col', 'meta'],
	render: function (h, ctx) {
		let meta = ctx.props.meta[ctx.props.col];
		let fld = getNestedField(ctx.props.row, ctx.props.col);
		let [txtRender/*, htmlRender*/] = getFormatters(meta);
		// ToDo: if cellRenderHTML exists, use it. If it returns null, use cellRender.
		let text = txtRender(fld, meta);
		return h('td', text);
	}
};


function getNestedField(obj, path) {
	return path.split('.').reduce(
		(prev, curr) => prev ? prev[curr] : undefined,
		obj
	);
}

function getFormatters(meta) {
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
	return [cellRender, cellRenderHTML];
}