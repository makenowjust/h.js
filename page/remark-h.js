const h = require('../h.js');
const visit = require('unist-util-visit');

module.exports = function attacher() {
	function visitor(node) {
		if (!node.lang || node.lang !== 'javascript' && node.lang !== 'js') {
			return;
		}

		const data = node.data = node.data || {};

		data.htmlContent = h(node.value);
		data.htmlAttributes = data.htmlAttributes || {};
		data.htmlAttributes.class = [
			data.htmlAttributes.class,
			'h-js'
		].filter(Boolean).join(' ');
	}

	return ast => visit(ast, 'code', visitor);
};
