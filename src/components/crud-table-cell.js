import typeHandlers from '../utils/types';


export default {
	functional: true,
	props: ['row', 'col', 'config', 'idx'],
	render: function (h, ctx) {
		let fld = getNestedField(ctx.props.row, ctx.props.col);
		let meta = ctx.props.config.meta[ctx.props.col] || {};
		// Get cell class
		let classes = ctx.props.config.cellClasses || [];
		let clz = classes[ctx.props.idx] || '';
		let dynClassF = getMetaProp(meta, 'cellClass');
		if (dynClassF) {
			let dynClass = dynClassF(fld, meta);
			if (dynClass) clz += ' ' + dynClass;
		}
		// Get field rendering
		let [nodeRender, htmlRender, txtRender] = getFormatters(meta);
		// Render node
		let node = null;
		if (nodeRender) node = nodeRender(h, fld, meta);
		if (!node && htmlRender) {
			let html = htmlRender(fld, meta);
			if (html) node = h('td', { class: clz, domProps: { innerHTML: html }});
		}
		if (!node) node = h('td', { class: clz }, txtRender(fld, meta));
		return node;
	}
};

function getMetaProp(meta, prop) {
	if (meta[prop]) return meta[prop];
	let type = meta.type ? meta.type : 'string';
	let thandler = typeHandlers[type];
	return thandler[prop];
}

function getNestedField(obj, path) {
	return path.split('.').reduce(
		(prev, curr) => prev ? prev[curr] : undefined,
		obj
	);
}

function getFormatters(meta) {
	let cellRenderNode = meta.cellRenderNode;
	let cellRenderHTML = meta.cellRenderHTML;
	let cellRender = meta.cellRender;
	let type = meta.type ? meta.type : 'string';
	let thandler = typeHandlers[type];
	cellRenderNode = cellRenderNode || thandler.cellRenderNode;
	cellRenderHTML = cellRenderHTML || thandler.cellRenderHTML;
	cellRender = cellRender || thandler.cellRender || (str => str);
	return [cellRenderNode, cellRenderHTML, cellRender];
}
