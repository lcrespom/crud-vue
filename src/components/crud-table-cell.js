import typeHandlers from '../utils/types';


export default {
	functional: true,
	props: ['row', 'col', 'meta'],
	render: function (h, ctx) {
		let meta = ctx.props.meta[ctx.props.col];
		let fld = getNestedField(ctx.props.row, ctx.props.col);
		let [nodeRender, htmlRender, txtRender] = getFormatters(meta);
		let node = null;
		if (nodeRender) node = nodeRender(h, fld, meta);
		if (!node && htmlRender) {
			let html = htmlRender(fld, meta);
			if (html) node = h('td', { domProps: { innerHTML: html }});
		}
		if (!node) node = h('td', txtRender(fld, meta));
		return node;
	}
};


function getNestedField(obj, path) {
	return path.split('.').reduce(
		(prev, curr) => prev ? prev[curr] : undefined,
		obj
	);
}

function getFormatters(meta) {
	let cellRenderNode = null;
	let cellRenderHTML = null;
	let cellRender = null;
	if (meta) {
		cellRenderNode = meta.cellRenderNode;
		cellRenderHTML = meta.cellRenderHTML;
		cellRender = meta.cellRender;
	}
	let type = meta && meta.type ? meta.type : 'string';
	let thandler = typeHandlers[type];
	cellRenderNode = cellRenderNode || thandler.cellRenderNode;
	cellRenderHTML = cellRenderHTML || thandler.cellRenderHTML;
	cellRender = cellRender || thandler.cellRender || (str => str);
	return [cellRenderNode, cellRenderHTML, cellRender];
}
