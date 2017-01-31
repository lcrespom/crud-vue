import typeHandlers from '../utils/types';
import { getNestedField } from '../utils/cmp-helpers';
import { getMetaProp } from '../utils/config';


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
		let [nodeRender, htmlRender, txtRender] = getCellRenderers(meta);
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

function getCellRenderers(meta) {
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
