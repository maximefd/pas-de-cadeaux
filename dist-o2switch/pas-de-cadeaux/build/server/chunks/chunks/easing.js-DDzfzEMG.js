// node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.72.2/node_modules/svelte/src/easing/index.js
/**
* Returns value as is.
*
* @param {number} t
* @returns {number}
*/
function linear(t) {
	return t;
}
/**
* Cubic scaling, decelerate towards end.
*
* @param {number} t
* @returns {number}
*/
function cubicOut(t) {
	const f = t - 1;
	return f * f * f + 1;
}

export { cubicOut as c, linear as l };
//# sourceMappingURL=easing.js-DDzfzEMG.js.map
