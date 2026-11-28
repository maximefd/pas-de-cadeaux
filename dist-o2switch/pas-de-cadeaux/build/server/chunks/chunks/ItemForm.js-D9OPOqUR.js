import { ax as unsubscribe_stores, aq as bind_props, ao as escape_html, av as store_get, ay as attr_class, au as attr, ak as attributes, am as clsx, aw as ensure_array_like, V as derived, ai as spread_props, aj as props_id, ah as fallback, al as exclude_from_object, an as to_array } from './index-server.js-CIVHNbBm.js';
import { p as page } from './state.js-DFeh0alp.js';
import './client.js-CtfT808N.js';
import { a as getPriceValue, b as getDefaultCurrency, c as getFormatter$1 } from './price-formatter.js-Cgx1svgQ.js';
import { f as getFormatter, h as getLocale, c as getNumberFormatter$1 } from './i18n2.js-1SlG2bAu.js';
import { C as Combobox } from './anatomy.js-Dd71kskB.js';
import { P as Portal } from './anatomy2.js-Deb7OEEc.js';
import { u as useListCollection } from './use-list-collection.js-brFPftRE.js';
import { x as useMachine, y as createContext, z as mergeProps, A as createMachine, r as raf, a as addDomEvent, c as contains, j as getEventTarget, d as getWindow, B as dataAttr, ac as flatArray, C as createAnatomy, D as createProps, E as normalizeProps } from './create-anatomy.js-CLhpGM8y.js';
import { w as warn, c as callAll, q as hash, g as createSplitProps } from './warning.js-12YgogjO.js';
import './toaster.js-DRl3MQi1.js';

// node_modules/.pnpm/@zag-js+dom-query@1.39.1/node_modules/@zag-js/dom-query/dist/visually-hidden.mjs
var visuallyHiddenStyle = {
	border: "0",
	clip: "rect(0 0 0 0)",
	height: "1px",
	margin: "-1px",
	overflow: "hidden",
	padding: "0",
	position: "absolute",
	width: "1px",
	whiteSpace: "nowrap",
	wordWrap: "normal"
};
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/modules/root-context.js
var RootContext = createContext();
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/clear-trigger.svelte
function Clear_trigger($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const fileUpload = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$12 = derived(() => mergeProps(fileUpload().getClearTriggerProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$12());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><button${attributes({ ...attributes$12() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></button>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/dropzone.svelte
function Dropzone($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const fileUpload = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$11 = derived(() => mergeProps(fileUpload().getDropzoneProps(props), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$11());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$11() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/hidden-input.svelte
function Hidden_input($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const fileUpload = RootContext.consume();
		const element = derived(() => props.element), rest = derived(() => exclude_from_object(props, ["element"]));
		const attributes$10 = derived(() => mergeProps(fileUpload().getHiddenInputProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$10());
			$$renderer.push(`<!---->`);
		} else $$renderer.push(`<!--[-1--><input${attributes({ ...attributes$10() }, void 0, void 0, void 0, 4)}/>`);
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/modules/item-context.js
var ItemContext = createContext();
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/item-delete-trigger.svelte
function times($$renderer) {
	$$renderer.push(`<!---->×`);
}
function Item_delete_trigger($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const fileUpload = RootContext.consume();
		const itemProps = ItemContext.consume();
		const element = derived(() => props.element), children = derived(() => fallback(props.children, times)), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$9 = derived(() => mergeProps(fileUpload().getItemDeleteTriggerProps(itemProps()), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$9());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><button${attributes({ ...attributes$9() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></button>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/item-group.svelte
function Item_group($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const fileUpload = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$8 = derived(() => mergeProps(fileUpload().getItemGroupProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$8());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><ul${attributes({ ...attributes$8() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></ul>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/item-name.svelte
function Item_name($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const fileUpload = RootContext.consume();
		const itemProps = ItemContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$7 = derived(() => mergeProps(fileUpload().getItemNameProps(itemProps()), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$7());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$7() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/item-size-text.svelte
function Item_size_text($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const fileUpload = RootContext.consume();
		const itemProps = ItemContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$6 = derived(() => mergeProps(fileUpload().getItemSizeTextProps(itemProps()), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$6());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$6() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
var parts = createAnatomy("file-upload").parts("root", "dropzone", "item", "itemDeleteTrigger", "itemGroup", "itemName", "itemPreview", "itemPreviewImage", "itemSizeText", "label", "trigger", "clearTrigger").build();
// node_modules/.pnpm/@zag-js+file-utils@1.39.1/node_modules/@zag-js/file-utils/dist/data-transfer.mjs
var getItemEntry = (item) => typeof item.getAsEntry === "function" ? item.getAsEntry() : typeof item.webkitGetAsEntry === "function" ? item.webkitGetAsEntry() : null;
var isDirectoryEntry = (entry) => entry.isDirectory;
var isFileEntry = (entry) => entry.isFile;
var addRelativePath = (file, path) => {
	Object.defineProperty(file, "relativePath", { value: path ? `${path}/${file.name}` : file.name });
	return file;
};
var getFileEntries = (items, traverseDirectories) => Promise.all(Array.from(items).filter((item) => item.kind === "file").map((item) => {
	const entry = getItemEntry(item);
	if (!entry) return null;
	if (isDirectoryEntry(entry) && traverseDirectories) return getDirectoryFiles(entry.createReader(), `${entry.name}`);
	if (isFileEntry(entry) && typeof item.getAsFile === "function") {
		const file = item.getAsFile();
		return Promise.resolve(file ? addRelativePath(file, "") : null);
	}
	if (isFileEntry(entry)) return new Promise((resolve) => {
		entry.file((file) => {
			resolve(addRelativePath(file, ""));
		});
	});
}).filter((b) => b));
var getDirectoryFiles = (reader, path = "") => new Promise((resolve) => {
	const entryPromises = [];
	const readDirectoryEntries = () => {
		reader.readEntries((entries) => {
			if (entries.length === 0) {
				resolve(Promise.all(entryPromises).then((entries2) => entries2.flat()));
				return;
			}
			const promises = entries.map((entry) => {
				if (!entry) return null;
				if (isDirectoryEntry(entry)) return getDirectoryFiles(entry.createReader(), `${path}${entry.name}`);
				if (isFileEntry(entry)) return new Promise((resolve2) => {
					entry.file((file) => {
						resolve2(addRelativePath(file, path));
					});
				});
			}).filter((b) => b);
			entryPromises.push(Promise.all(promises));
			readDirectoryEntries();
		});
	};
	readDirectoryEntries();
});
// node_modules/.pnpm/@zag-js+file-utils@1.39.1/node_modules/@zag-js/file-utils/dist/get-accept-attr.mjs
function isMIMEType(v) {
	return v === "audio/*" || v === "video/*" || v === "image/*" || v === "text/*" || /\w+\/[-+.\w]+/g.test(v);
}
function isExt(v) {
	return /^.*\.[\w]+$/.test(v);
}
var isValidMIME = (v) => isMIMEType(v) || isExt(v);
function getAcceptAttrString(accept) {
	if (accept == null) return;
	if (typeof accept === "string") return accept;
	if (Array.isArray(accept)) return accept.filter(isValidMIME).join(",");
	return Object.entries(accept).reduce((a, [mimeType, ext]) => [
		...a,
		mimeType,
		...ext
	], []).filter(isValidMIME).join(",");
}
// node_modules/.pnpm/@zag-js+file-utils@1.39.1/node_modules/@zag-js/file-utils/dist/is-file-equal.mjs
var isFileEqual = (file1, file2) => {
	return file1.name === file2.name && file1.size === file2.size && file1.type === file2.type;
};
// node_modules/.pnpm/@zag-js+file-utils@1.39.1/node_modules/@zag-js/file-utils/dist/is-valid-file-size.mjs
var isDefined = (v) => v !== void 0 && v !== null;
function isValidFileSize(file, minSize, maxSize) {
	if (isDefined(file.size)) {
		if (isDefined(minSize) && isDefined(maxSize)) {
			if (file.size > maxSize) return [false, "FILE_TOO_LARGE"];
			if (file.size < minSize) return [false, "FILE_TOO_SMALL"];
		} else if (isDefined(minSize) && file.size < minSize) return [false, "FILE_TOO_SMALL"];
		else if (isDefined(maxSize) && file.size > maxSize) return [false, "FILE_TOO_LARGE"];
	}
	return [true, null];
}
var mimeTypesMap = new Map("3g2_video/3gpp2[3gp,3gpp_video/3gpp[3mf_model/3mf[7z_application/x-7z-compressed[aac_audio/aac[ac_application/pkix-attr-cert[adp_audio/adpcm[adts_audio/aac[ai_application/postscript[aml_application/automationml-aml+xml[amlx_application/automationml-amlx+zip[amr_audio/amr[apk_application/vnd.android.package-archive[apng_image/apng[appcache,manifest_text/cache-manifest[appinstaller_application/appinstaller[appx_application/appx[appxbundle_application/appxbundle[asc_application/pgp-keys[atom_application/atom+xml[atomcat_application/atomcat+xml[atomdeleted_application/atomdeleted+xml[atomsvc_application/atomsvc+xml[au,snd_audio/basic[avi_video/x-msvideo[avci_image/avci[avcs_image/avcs[avif_image/avif[aw_application/applixware[bdoc_application/bdoc[bin,bpk,buffer,deb,deploy,dist,distz,dll,dmg,dms,dump,elc,exe,img,iso,lrf,mar,msi,msm,msp,pkg,so_application/octet-stream[bmp,dib_image/bmp[btf,btif_image/prs.btif[bz2_application/x-bzip2[c_text/x-c[ccxml_application/ccxml+xml[cdfx_application/cdfx+xml[cdmia_application/cdmi-capability[cdmic_application/cdmi-container[cdmid_application/cdmi-domain[cdmio_application/cdmi-object[cdmiq_application/cdmi-queue[cer_application/pkix-cert[cgm_image/cgm[cjs_application/node[class_application/java-vm[coffee,litcoffee_text/coffeescript[conf,def,in,ini,list,log,text,txt_text/plain[cpp,cxx,cc_text/x-c++src[cpl_application/cpl+xml[cpt_application/mac-compactpro[crl_application/pkix-crl[css_text/css[csv_text/csv[cu_application/cu-seeme[cwl_application/cwl[cww_application/prs.cww[davmount_application/davmount+xml[dbk_application/docbook+xml[doc_application/msword[docx_application/vnd.openxmlformats-officedocument.wordprocessingml.document[dsc_text/prs.lines.tag[dssc_application/dssc+der[dtd_application/xml-dtd[dwd_application/atsc-dwd+xml[ear,jar,war_application/java-archive[ecma_application/ecmascript[emf_image/emf[eml,mime_message/rfc822[emma_application/emma+xml[emotionml_application/emotionml+xml[eot_application/vnd.ms-fontobject[eps,ps_application/postscript[epub_application/epub+zip[exi_application/exi[exp_application/express[exr_image/aces[ez_application/andrew-inset[fdf_application/fdf[fdt_application/fdt+xml[fits_image/fits[flac_audio/flac[flv_video/x-flv[g3_image/g3fax[geojson_application/geo+json[gif_image/gif[glb_model/gltf-binary[gltf_model/gltf+json[gml_application/gml+xml[go_text/x-go[gpx_application/gpx+xml[gz_application/gzip[h_text/x-h[h261_video/h261[h263_video/h263[h264_video/h264[heic_image/heic[heics_image/heic-sequence[heif_image/heif[heifs_image/heif-sequence[htm,html,shtml_text/html[ico_image/x-icon[icns_image/x-icns[ics,ifb_text/calendar[iges,igs_model/iges[ink,inkml_application/inkml+xml[ipa_application/octet-stream[java_text/x-java-source[jp2,jpg2_image/jp2[jpeg,jpe,jpg_image/jpeg[jpf,jpx_image/jpx[jpm,jpgm_image/jpm[jpgv_video/jpeg[jph_image/jph[js,mjs_text/javascript[json_application/json[json5_application/json5[jsonld_application/ld+json[jsx_text/jsx[jxl_image/jxl[jxr_image/jxr[ktx_image/ktx[ktx2_image/ktx2[less_text/less[m1v,m2v,mpe,mpeg,mpg_video/mpeg[m4a_audio/mp4[m4v_video/x-m4v[md,markdown_text/markdown[mid,midi,kar,rmi_audio/midi[mkv_video/x-matroska[mp2,mp2a,mp3,mpga,m3a,m2a_audio/mpeg[mp4,mp4v,mpg4_video/mp4[mp4a_audio/mp4[mp4s,m4p_application/mp4[odp_application/vnd.oasis.opendocument.presentation[oda_application/oda[ods_application/vnd.oasis.opendocument.spreadsheet[odt_application/vnd.oasis.opendocument.text[oga,ogg,opus,spx_audio/ogg[ogv_video/ogg[ogx_application/ogg[otf_font/otf[p12,pfx_application/x-pkcs12[pdf_application/pdf[pem_application/x-pem-file[php_text/x-php[png_image/png[ppt_application/vnd.ms-powerpoint[pptx_application/vnd.openxmlformats-officedocument.presentationml.presentation[pskcxml_application/pskc+xml[psd_image/vnd.adobe.photoshop[py_text/x-python[qt,mov_video/quicktime[rar_application/vnd.rar[rdf_application/rdf+xml[rtf_text/rtf[sass_text/x-sass[scss_text/x-scss[sgm,sgml_text/sgml[sh_application/x-sh[svg,svgz_image/svg+xml[swf_application/x-shockwave-flash[tar_application/x-tar[tif,tiff_image/tiff[toml_application/toml[ts_video/mp2t[tsx_text/tsx[tsv_text/tab-separated-values[ttc_font/collection[ttf_font/ttf[vtt_text/vtt[wasm_application/wasm[wav_audio/wav[weba_audio/webm[webm_video/webm[webmanifest_application/manifest+json[webp_image/webp[wma_audio/x-ms-wma[wmv_video/x-ms-wmv[woff_font/woff[woff2_font/woff2[xls_application/vnd.ms-excel[xlsx_application/vnd.openxmlformats-officedocument.spreadsheetml.sheet[xml_application/xml[xz_application/x-xz[yaml,yml_text/yaml[zip_application/zip".split("[").flatMap((mime) => {
	const [extensions, mimeType] = mime.split("_");
	return extensions.split(",").map((ext) => [ext, mimeType]);
}));
// node_modules/.pnpm/@zag-js+file-utils@1.39.1/node_modules/@zag-js/file-utils/dist/get-file-mime-type.mjs
function getFileMimeType(name) {
	const extension = name.split(".").pop();
	return extension ? mimeTypesMap.get(extension) || null : null;
}
// node_modules/.pnpm/@zag-js+file-utils@1.39.1/node_modules/@zag-js/file-utils/dist/is-valid-file-type.mjs
function isFileAccepted(file, accept) {
	if (file && accept) {
		const types = Array.isArray(accept) ? accept : typeof accept === "string" ? accept.split(",") : [];
		if (types.length === 0) return true;
		const fileName = file.name || "";
		const mimeType = (file.type || getFileMimeType(fileName) || "").toLowerCase();
		const baseMimeType = mimeType.replace(/\/.*$/, "");
		return types.some((type) => {
			const validType = type.trim().toLowerCase();
			if (validType.charAt(0) === ".") return fileName.toLowerCase().endsWith(validType);
			if (validType.endsWith("/*")) return baseMimeType === validType.replace(/\/.*$/, "");
			return mimeType === validType;
		});
	}
	return true;
}
function isValidFileType(file, accept) {
	const isAcceptable = file.type === "application/x-moz-file" || isFileAccepted(file, accept);
	return [isAcceptable, isAcceptable ? null : "FILE_INVALID_TYPE"];
}
// node_modules/.pnpm/@zag-js+i18n-utils@1.39.1/node_modules/@zag-js/i18n-utils/dist/cache.mjs
function i18nCache(Ins) {
	const formatterCache = /* @__PURE__ */ new Map();
	return function create(locale, options) {
		const cacheKey = locale + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
		if (formatterCache.has(cacheKey)) return formatterCache.get(cacheKey);
		let formatter = new Ins(locale, options);
		formatterCache.set(cacheKey, formatter);
		return formatter;
	};
}
// node_modules/.pnpm/@zag-js+i18n-utils@1.39.1/node_modules/@zag-js/i18n-utils/dist/format-number.mjs
var getNumberFormatter = i18nCache(Intl.NumberFormat);
function formatNumber(v, locale, options = {}) {
	return getNumberFormatter(locale, options).format(v);
}
// node_modules/.pnpm/@zag-js+i18n-utils@1.39.1/node_modules/@zag-js/i18n-utils/dist/format-bytes.mjs
var bitPrefixes = [
	"",
	"kilo",
	"mega",
	"giga",
	"tera"
];
var bytePrefixes = [
	"",
	"kilo",
	"mega",
	"giga",
	"tera",
	"peta"
];
var formatBytes = (bytes, locale = "en-US", options = {}) => {
	if (Number.isNaN(bytes)) return "";
	if (bytes === 0) return "0 B";
	const { unitSystem = "decimal", precision = 3, unit = "byte", unitDisplay = "short" } = options;
	const factor = unitSystem === "binary" ? 1024 : 1e3;
	const prefix = unit === "bit" ? bitPrefixes : bytePrefixes;
	const isNegative = bytes < 0;
	let value = Math.abs(bytes);
	let index = 0;
	while (value >= factor && index < prefix.length - 1) {
		value /= factor;
		index++;
	}
	const v = parseFloat(value.toPrecision(precision));
	return formatNumber(isNegative ? -v : v, locale, {
		style: "unit",
		unit: prefix[index] + unit,
		unitDisplay
	});
};
// node_modules/.pnpm/@zag-js+file-upload@1.39.1/node_modules/@zag-js/file-upload/dist/file-upload.dom.mjs
var getRootId = (ctx) => ctx.ids?.root ?? `file:${ctx.id}`;
var getDropzoneId = (ctx) => ctx.ids?.dropzone ?? `file:${ctx.id}:dropzone`;
var getHiddenInputId = (ctx) => ctx.ids?.hiddenInput ?? `file:${ctx.id}:input`;
var getTriggerId = (ctx) => ctx.ids?.trigger ?? `file:${ctx.id}:trigger`;
var getLabelId = (ctx) => ctx.ids?.label ?? `file:${ctx.id}:label`;
var getItemId = (ctx, id) => ctx.ids?.item?.(id) ?? `file:${ctx.id}:item:${id}`;
var getItemNameId = (ctx, id) => ctx.ids?.itemName?.(id) ?? `file:${ctx.id}:item-name:${id}`;
var getItemSizeTextId = (ctx, id) => ctx.ids?.itemSizeText?.(id) ?? `file:${ctx.id}:item-size:${id}`;
var getItemPreviewId = (ctx, id) => ctx.ids?.itemPreview?.(id) ?? `file:${ctx.id}:item-preview:${id}`;
var getItemDeleteTriggerId = (ctx, id) => ctx.ids?.itemDeleteTrigger?.(id) ?? `file:${ctx.id}:item-delete:${id}`;
var getFileId = (file) => hash(`${file.name}-${file.size}`);
var getRootEl = (ctx) => ctx.getById(getRootId(ctx));
var getHiddenInputEl = (ctx) => ctx.getById(getHiddenInputId(ctx));
var getDropzoneEl = (ctx) => ctx.getById(getDropzoneId(ctx));
// node_modules/.pnpm/@zag-js+file-upload@1.39.1/node_modules/@zag-js/file-upload/dist/file-upload.utils.mjs
function isEventWithFiles(event) {
	const target = getEventTarget(event);
	if (!event.dataTransfer) return !!target && "files" in target;
	return event.dataTransfer.types.some((type) => {
		return type === "Files" || type === "application/x-moz-file";
	});
}
function isFilesWithinRange(ctx, incomingCount, currentAcceptedFiles) {
	const { prop, computed } = ctx;
	if (!computed("multiple") && incomingCount > 1) return false;
	if (!computed("multiple") && incomingCount + currentAcceptedFiles.length === 2) return true;
	if (incomingCount + currentAcceptedFiles.length > prop("maxFiles")) return false;
	return true;
}
function getEventFiles(ctx, files, currentAcceptedFiles = [], currentRejectedFiles = []) {
	const { prop, computed } = ctx;
	const acceptedFiles = [];
	const rejectedFiles = [];
	const validateParams = {
		acceptedFiles: currentAcceptedFiles,
		rejectedFiles: currentRejectedFiles
	};
	files.forEach((file) => {
		const [accepted, acceptError] = isValidFileType(file, computed("acceptAttr"));
		const [sizeMatch, sizeError] = isValidFileSize(file, prop("minFileSize"), prop("maxFileSize"));
		const isDuplicate = currentAcceptedFiles.some((f) => isFileEqual(f, file)) || acceptedFiles.some((f) => isFileEqual(f, file));
		const validateErrors = prop("validate")?.(file, validateParams);
		const valid = validateErrors ? validateErrors.length === 0 : true;
		if (accepted && sizeMatch && valid && !isDuplicate) acceptedFiles.push(file);
		else {
			const errors = [acceptError, sizeError];
			if (isDuplicate) errors.push("FILE_EXISTS");
			if (!valid) errors.push(...validateErrors ?? []);
			rejectedFiles.push({
				file,
				errors: errors.filter(Boolean)
			});
		}
	});
	if (!isFilesWithinRange(ctx, acceptedFiles.length, currentAcceptedFiles)) {
		acceptedFiles.forEach((file) => {
			rejectedFiles.push({
				file,
				errors: ["TOO_MANY_FILES"]
			});
		});
		acceptedFiles.splice(0);
	}
	return {
		acceptedFiles,
		rejectedFiles
	};
}
function setInputFiles(inputEl, files) {
	const win = getWindow(inputEl);
	try {
		if ("DataTransfer" in win) {
			const dataTransfer = new win.DataTransfer();
			files.forEach((file) => {
				dataTransfer.items.add(file);
			});
			inputEl.files = dataTransfer.files;
		}
	} catch {}
}
// node_modules/.pnpm/@zag-js+file-upload@1.39.1/node_modules/@zag-js/file-upload/dist/file-upload.connect.mjs
var DEFAULT_ITEM_TYPE = "accepted";
var INTERACTIVE_SELECTOR = "button, a[href], input:not([type='file']), select, textarea, [tabindex], [contenteditable]";
function isInteractiveTarget(element, container) {
	if (!element || element.getAttribute("type") === "file") return false;
	const interactive = element.closest(INTERACTIVE_SELECTOR);
	return interactive != container && contains(container, interactive);
}
function connect(service, normalize) {
	const { state, send, prop, computed, scope, context } = service;
	const disabled = !!prop("disabled");
	const readOnly = !!prop("readOnly");
	const required = !!prop("required");
	const allowDrop = prop("allowDrop");
	const translations = prop("translations");
	const dragging = state.matches("dragging");
	const focused = state.matches("focused") && !disabled;
	const acceptedFiles = context.get("acceptedFiles");
	const maxFiles = prop("maxFiles");
	return {
		dragging,
		focused,
		disabled,
		readOnly,
		transforming: context.get("transforming"),
		maxFilesReached: acceptedFiles.length >= maxFiles,
		remainingFiles: Math.max(0, maxFiles - acceptedFiles.length),
		openFilePicker() {
			if (disabled || readOnly) return;
			send({ type: "OPEN" });
		},
		deleteFile(file, type = DEFAULT_ITEM_TYPE) {
			if (disabled || readOnly) return;
			send({
				type: "FILE.DELETE",
				file,
				itemType: type
			});
		},
		acceptedFiles,
		rejectedFiles: context.get("rejectedFiles"),
		setFiles(files) {
			if (disabled || readOnly) return;
			send({
				type: "FILES.SET",
				files,
				count: files.length
			});
		},
		clearRejectedFiles() {
			if (disabled || readOnly) return;
			send({ type: "REJECTED_FILES.CLEAR" });
		},
		clearFiles() {
			if (disabled || readOnly) return;
			send({ type: "FILES.CLEAR" });
		},
		getFileSize(file) {
			return formatBytes(file.size, prop("locale"));
		},
		createFileUrl(file, cb) {
			const win = scope.getWin();
			const url = win.URL.createObjectURL(file);
			cb(url);
			return () => win.URL.revokeObjectURL(url);
		},
		setClipboardFiles(dt) {
			if (disabled || readOnly) return false;
			const files = Array.from(dt?.items ?? []).reduce((acc, item) => {
				if (item.kind !== "file") return acc;
				const file = item.getAsFile();
				if (!file) return acc;
				return [...acc, file];
			}, []);
			if (!files.length) return false;
			send({
				type: "FILE.SELECT",
				files
			});
			return true;
		},
		getRootProps() {
			return normalize.element({
				...parts.root.attrs,
				dir: prop("dir"),
				id: getRootId(scope),
				"data-disabled": dataAttr(disabled),
				"data-readonly": dataAttr(readOnly),
				"data-dragging": dataAttr(dragging)
			});
		},
		getDropzoneProps(props = {}) {
			return normalize.element({
				...parts.dropzone.attrs,
				dir: prop("dir"),
				id: getDropzoneId(scope),
				tabIndex: disabled || readOnly || props.disableClick ? void 0 : 0,
				role: props.disableClick ? "application" : "button",
				"aria-label": translations.dropzone,
				"aria-disabled": disabled || readOnly || void 0,
				"data-invalid": dataAttr(prop("invalid")),
				"data-disabled": dataAttr(disabled),
				"data-readonly": dataAttr(readOnly),
				"data-dragging": dataAttr(dragging),
				onKeyDown(event) {
					if (disabled || readOnly) return;
					if (event.defaultPrevented) return;
					const target = getEventTarget(event);
					if (!contains(event.currentTarget, target)) return;
					if (isInteractiveTarget(target, event.currentTarget)) return;
					if (props.disableClick) return;
					if (event.key !== "Enter" && event.key !== " ") return;
					send({
						type: "DROPZONE.CLICK",
						src: "keydown"
					});
				},
				onClick(event) {
					if (disabled || readOnly) return;
					if (event.defaultPrevented) return;
					if (props.disableClick) return;
					const target = getEventTarget(event);
					if (!contains(event.currentTarget, target)) return;
					if (isInteractiveTarget(target, event.currentTarget)) return;
					if (event.currentTarget.localName === "label") event.preventDefault();
					send({ type: "DROPZONE.CLICK" });
				},
				onDragOver(event) {
					if (disabled || readOnly) return;
					if (!allowDrop) return;
					event.preventDefault();
					event.stopPropagation();
					try {
						event.dataTransfer.dropEffect = "copy";
					} catch {}
					if (!isEventWithFiles(event)) return;
					const count = event.dataTransfer.items.length;
					send({
						type: "DROPZONE.DRAG_OVER",
						count
					});
				},
				onDragLeave(event) {
					if (disabled || readOnly) return;
					if (!allowDrop) return;
					if (contains(event.currentTarget, event.relatedTarget)) return;
					send({ type: "DROPZONE.DRAG_LEAVE" });
				},
				onDrop(event) {
					if (disabled || readOnly) return;
					if (allowDrop) {
						event.preventDefault();
						event.stopPropagation();
					}
					if (!isEventWithFiles(event)) return;
					getFileEntries(event.dataTransfer.items, prop("directory")).then((files) => {
						send({
							type: "DROPZONE.DROP",
							files: flatArray(files)
						});
					});
				},
				onFocus() {
					if (disabled || readOnly) return;
					send({ type: "DROPZONE.FOCUS" });
				},
				onBlur() {
					if (disabled || readOnly) return;
					send({ type: "DROPZONE.BLUR" });
				}
			});
		},
		getTriggerProps() {
			return normalize.button({
				...parts.trigger.attrs,
				dir: prop("dir"),
				id: getTriggerId(scope),
				disabled: disabled || readOnly,
				"data-disabled": dataAttr(disabled),
				"data-readonly": dataAttr(readOnly),
				"data-invalid": dataAttr(prop("invalid")),
				type: "button",
				onClick(event) {
					if (disabled || readOnly) return;
					if (contains(getDropzoneEl(scope), event.currentTarget)) event.stopPropagation();
					send({ type: "OPEN" });
				}
			});
		},
		getHiddenInputProps() {
			return normalize.input({
				id: getHiddenInputId(scope),
				tabIndex: -1,
				disabled: disabled || readOnly,
				type: "file",
				required: prop("required"),
				capture: prop("capture"),
				name: prop("name"),
				accept: computed("acceptAttr"),
				webkitdirectory: prop("directory") ? "" : void 0,
				multiple: computed("multiple") || prop("maxFiles") > 1,
				"aria-hidden": true,
				onClick(event) {
					event.stopPropagation();
					event.currentTarget.value = "";
				},
				onInput(event) {
					if (disabled || readOnly) return;
					const { files } = event.currentTarget;
					send({
						type: "FILE.SELECT",
						files: files ? Array.from(files) : []
					});
				},
				style: visuallyHiddenStyle
			});
		},
		getItemGroupProps(props = {}) {
			const { type = DEFAULT_ITEM_TYPE } = props;
			return normalize.element({
				...parts.itemGroup.attrs,
				dir: prop("dir"),
				"data-disabled": dataAttr(disabled),
				"data-type": type
			});
		},
		getItemProps(props) {
			const { file, type = DEFAULT_ITEM_TYPE } = props;
			return normalize.element({
				...parts.item.attrs,
				dir: prop("dir"),
				id: getItemId(scope, getFileId(file)),
				"data-disabled": dataAttr(disabled),
				"data-type": type
			});
		},
		getItemNameProps(props) {
			const { file, type = DEFAULT_ITEM_TYPE } = props;
			return normalize.element({
				...parts.itemName.attrs,
				dir: prop("dir"),
				id: getItemNameId(scope, getFileId(file)),
				"data-disabled": dataAttr(disabled),
				"data-type": type
			});
		},
		getItemSizeTextProps(props) {
			const { file, type = DEFAULT_ITEM_TYPE } = props;
			return normalize.element({
				...parts.itemSizeText.attrs,
				dir: prop("dir"),
				id: getItemSizeTextId(scope, getFileId(file)),
				"data-disabled": dataAttr(disabled),
				"data-type": type
			});
		},
		getItemPreviewProps(props) {
			const { file, type = DEFAULT_ITEM_TYPE } = props;
			return normalize.element({
				...parts.itemPreview.attrs,
				dir: prop("dir"),
				id: getItemPreviewId(scope, getFileId(file)),
				"data-disabled": dataAttr(disabled),
				"data-type": type
			});
		},
		getItemPreviewImageProps(props) {
			const { file, url, type = DEFAULT_ITEM_TYPE } = props;
			if (!file.type.startsWith("image/")) throw new Error("Preview Image is only supported for image files");
			return normalize.img({
				...parts.itemPreviewImage.attrs,
				alt: translations.itemPreview?.(file),
				src: url,
				"data-disabled": dataAttr(disabled),
				"data-type": type
			});
		},
		getItemDeleteTriggerProps(props) {
			const { file, type = DEFAULT_ITEM_TYPE } = props;
			return normalize.button({
				...parts.itemDeleteTrigger.attrs,
				dir: prop("dir"),
				id: getItemDeleteTriggerId(scope, getFileId(file)),
				type: "button",
				disabled: disabled || readOnly,
				"data-disabled": dataAttr(disabled),
				"data-readonly": dataAttr(readOnly),
				"data-type": type,
				"aria-label": translations.deleteFile?.(file),
				onClick() {
					if (disabled || readOnly) return;
					send({
						type: "FILE.DELETE",
						file,
						itemType: type
					});
				}
			});
		},
		getLabelProps() {
			return normalize.label({
				...parts.label.attrs,
				dir: prop("dir"),
				id: getLabelId(scope),
				htmlFor: getHiddenInputId(scope),
				"data-disabled": dataAttr(disabled),
				"data-required": dataAttr(required)
			});
		},
		getClearTriggerProps() {
			return normalize.button({
				...parts.clearTrigger.attrs,
				dir: prop("dir"),
				type: "button",
				disabled: disabled || readOnly,
				hidden: acceptedFiles.length === 0,
				"data-disabled": dataAttr(disabled),
				"data-readonly": dataAttr(readOnly),
				onClick(event) {
					if (event.defaultPrevented) return;
					if (disabled || readOnly) return;
					send({ type: "FILES.CLEAR" });
				}
			});
		}
	};
}
// node_modules/.pnpm/@zag-js+file-upload@1.39.1/node_modules/@zag-js/file-upload/dist/file-upload.machine.mjs
var machine = createMachine({
	props({ props }) {
		return {
			minFileSize: 0,
			maxFileSize: Number.POSITIVE_INFINITY,
			maxFiles: 1,
			allowDrop: true,
			preventDocumentDrop: true,
			defaultAcceptedFiles: [],
			...props,
			translations: {
				dropzone: "dropzone",
				itemPreview: (file) => `preview of ${file.name}`,
				deleteFile: (file) => `delete file ${file.name}`,
				...props.translations
			}
		};
	},
	initialState() {
		return "idle";
	},
	context({ prop, bindable, getContext }) {
		return {
			acceptedFiles: bindable(() => ({
				defaultValue: prop("defaultAcceptedFiles"),
				value: prop("acceptedFiles"),
				isEqual: (a, b) => a.length === b?.length && a.every((file, i) => isFileEqual(file, b[i])),
				hash(value) {
					return value.map((file) => `${file.name}-${file.size}`).join(",");
				},
				onChange(value) {
					const ctx = getContext();
					prop("onFileAccept")?.({ files: value });
					prop("onFileChange")?.({
						acceptedFiles: value,
						rejectedFiles: ctx.get("rejectedFiles")
					});
				}
			})),
			rejectedFiles: bindable(() => ({
				defaultValue: [],
				isEqual: (a, b) => a.length === b?.length && a.every((file, i) => isFileEqual(file.file, b[i].file)),
				onChange(value) {
					const ctx = getContext();
					prop("onFileReject")?.({ files: value });
					prop("onFileChange")?.({
						acceptedFiles: ctx.get("acceptedFiles"),
						rejectedFiles: value
					});
				}
			})),
			transforming: bindable(() => ({ defaultValue: false }))
		};
	},
	computed: {
		acceptAttr: ({ prop }) => getAcceptAttrString(prop("accept")),
		multiple: ({ prop }) => prop("maxFiles") > 1
	},
	watch({ track, context, action }) {
		track([() => context.hash("acceptedFiles")], () => {
			action(["syncInputElement"]);
		});
	},
	on: {
		"FILES.SET": { actions: ["setFiles"] },
		"FILE.SELECT": { actions: ["setEventFiles"] },
		"FILE.DELETE": { actions: ["removeFile"] },
		"FILES.CLEAR": { actions: ["clearFiles"] },
		"REJECTED_FILES.CLEAR": { actions: ["clearRejectedFiles"] }
	},
	effects: ["preventDocumentDrop"],
	states: {
		idle: { on: {
			OPEN: { actions: ["openFilePicker"] },
			"DROPZONE.CLICK": { actions: ["openFilePicker"] },
			"DROPZONE.FOCUS": { target: "focused" },
			"DROPZONE.DRAG_OVER": { target: "dragging" }
		} },
		focused: { on: {
			"DROPZONE.BLUR": { target: "idle" },
			OPEN: { actions: ["openFilePicker"] },
			"DROPZONE.CLICK": { actions: ["openFilePicker"] },
			"DROPZONE.DRAG_OVER": { target: "dragging" }
		} },
		dragging: { on: {
			"DROPZONE.DROP": {
				target: "idle",
				actions: ["setEventFiles"]
			},
			"DROPZONE.DRAG_LEAVE": { target: "idle" }
		} }
	},
	implementations: {
		effects: { preventDocumentDrop({ prop, scope }) {
			if (!prop("preventDocumentDrop")) return;
			if (!prop("allowDrop")) return;
			if (prop("disabled")) return;
			const doc = scope.getDoc();
			const onDragOver = (event) => {
				event?.preventDefault();
			};
			const onDrop = (event) => {
				if (contains(getRootEl(scope), getEventTarget(event))) return;
				event.preventDefault();
			};
			return callAll(addDomEvent(doc, "dragover", onDragOver, false), addDomEvent(doc, "drop", onDrop, false));
		} },
		actions: {
			syncInputElement({ scope, context }) {
				queueMicrotask(() => {
					const inputEl = getHiddenInputEl(scope);
					if (!inputEl) return;
					setInputFiles(inputEl, context.get("acceptedFiles"));
					const win = scope.getWin();
					inputEl.dispatchEvent(new win.Event("change", { bubbles: true }));
				});
			},
			openFilePicker({ scope }) {
				raf(() => {
					getHiddenInputEl(scope)?.click();
				});
			},
			setFiles(params) {
				const { computed, context, event } = params;
				const { acceptedFiles, rejectedFiles } = getEventFiles(params, event.files);
				context.set("acceptedFiles", computed("multiple") ? acceptedFiles : acceptedFiles.length > 0 ? [acceptedFiles[0]] : []);
				context.set("rejectedFiles", rejectedFiles);
			},
			setEventFiles(params) {
				const { computed, context, event, prop } = params;
				const currentAcceptedFiles = context.get("acceptedFiles");
				const currentRejectedFiles = context.get("rejectedFiles");
				const { acceptedFiles, rejectedFiles } = getEventFiles(params, event.files, currentAcceptedFiles, currentRejectedFiles);
				const set = (files) => {
					if (computed("multiple")) {
						context.set("acceptedFiles", (prev) => [...prev, ...files]);
						context.set("rejectedFiles", rejectedFiles);
						return;
					}
					if (files.length) {
						context.set("acceptedFiles", [files[0]]);
						context.set("rejectedFiles", rejectedFiles);
						return;
					}
					if (rejectedFiles.length) {
						context.set("acceptedFiles", context.get("acceptedFiles"));
						context.set("rejectedFiles", rejectedFiles);
					}
				};
				const transform = prop("transformFiles");
				if (transform) {
					context.set("transforming", true);
					transform(acceptedFiles).then(set).catch((err) => {
						warn(`[zag-js/file-upload] error transforming files
${err}`);
					}).finally(() => {
						context.set("transforming", false);
					});
				} else set(acceptedFiles);
			},
			removeFile({ context, event }) {
				if (event.itemType === "rejected") {
					const rejectedFiles = context.get("rejectedFiles").filter((item) => !isFileEqual(item.file, event.file));
					context.set("rejectedFiles", rejectedFiles);
				} else {
					const files = context.get("acceptedFiles").filter((file) => !isFileEqual(file, event.file));
					context.set("acceptedFiles", files);
				}
			},
			clearRejectedFiles({ context }) {
				context.set("rejectedFiles", []);
			},
			clearFiles({ context }) {
				context.set("acceptedFiles", []);
				context.set("rejectedFiles", []);
			}
		}
	}
});
// node_modules/.pnpm/@zag-js+file-upload@1.39.1/node_modules/@zag-js/file-upload/dist/file-upload.props.mjs
var props = createProps()([
	"accept",
	"acceptedFiles",
	"allowDrop",
	"capture",
	"defaultAcceptedFiles",
	"dir",
	"directory",
	"disabled",
	"getRootNode",
	"id",
	"ids",
	"invalid",
	"locale",
	"maxFiles",
	"maxFileSize",
	"minFileSize",
	"name",
	"onFileAccept",
	"onFileChange",
	"onFileReject",
	"preventDocumentDrop",
	"readOnly",
	"required",
	"transformFiles",
	"translations",
	"validate"
]);
var splitProps = createSplitProps(props);
var itemProps = createProps()(["file", "type"]);
var splitItemProps = createSplitProps(itemProps);
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/item.svelte
function Item($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const fileUpload = RootContext.consume();
		const $$d = derived(() => splitItemProps(props)), $$derived_array = derived(() => to_array($$d(), 2)), itemProps = derived(() => $$derived_array()[0]), componentProps = derived(() => $$derived_array()[1]);
		const element = derived(() => componentProps().element), children = derived(() => componentProps().children), rest = derived(() => exclude_from_object(componentProps(), ["element", "children"]));
		const attributes$5 = derived(() => mergeProps(fileUpload().getItemProps(itemProps()), rest()));
		ItemContext.provide(() => itemProps());
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$5());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><li${attributes({ ...attributes$5() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></li>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/label.svelte
function Label($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const fileUpload = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$4 = derived(() => mergeProps(fileUpload().getLabelProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$4());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><label${attributes({ ...attributes$4() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></label>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/root-context.svelte
function Root_context($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const fileUpload = RootContext.consume();
		derived(() => props.children)()($$renderer, fileUpload);
		$$renderer.push(`<!---->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/root-provider.svelte
function Root_provider($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const element = derived(() => props.element), children = derived(() => props.children), fileUpload = derived(() => props.value), rest = derived(() => exclude_from_object(props, [
			"element",
			"children",
			"value"
		]));
		const attributes$3 = derived(() => mergeProps(fileUpload()().getRootProps(), rest()));
		RootContext.provide(() => fileUpload()());
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$3());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$3() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/modules/provider.svelte.js
function useFileUpload(props) {
	const service = useMachine(machine, props);
	const fileUpload = derived(() => connect(service, normalizeProps));
	return () => fileUpload();
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/root.svelte
function Root($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const id = props_id($$renderer);
		const { $$slots, $$events, ...props } = $$props;
		const $$d = derived(() => splitProps(props)), $$derived_array = derived(() => to_array($$d(), 2)), fileUploadProps = derived(() => $$derived_array()[0]), componentProps = derived(() => $$derived_array()[1]);
		const element = derived(() => componentProps().element), children = derived(() => componentProps().children), rest = derived(() => exclude_from_object(componentProps(), ["element", "children"]));
		const fileUpload = useFileUpload(() => ({
			...fileUploadProps(),
			id
		}));
		const attributes$2 = derived(() => mergeProps(fileUpload().getRootProps(), rest()));
		RootContext.provide(() => fileUpload());
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$2());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$2() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/anatomy/trigger.svelte
function Trigger($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const fileUpload = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$1 = derived(() => mergeProps(fileUpload().getTriggerProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$1());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><button${attributes({ ...attributes$1() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></button>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/file-upload/modules/anatomy.js
var FileUpload = Object.assign(Root, {
	Provider: Root_provider,
	Context: Root_context,
	Label,
	Dropzone,
	Trigger,
	ClearTrigger: Clear_trigger,
	HiddenInput: Hidden_input,
	ItemGroup: Item_group,
	Item,
	ItemName: Item_name,
	ItemSizeText: Item_size_text,
	ItemDeleteTrigger: Item_delete_trigger
});
// src/lib/components/CurrencyInput.svelte
function CurrencyInput($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { value = null, currency = "USD", name, id, disabled = false } = $$props;
		const locale = getLocale();
		let numberFormatter = getNumberFormatter$1({ locale });
		let priceFormatter = derived(() => getFormatter$1(currency));
		let maximumFractionDigits = derived(() => priceFormatter().resolvedOptions().maximumFractionDigits || 2);
		let displayValue = value !== null ? numberFormatter.format(value) : "";
		const availableCurrencies = Intl.supportedValuesOf("currency");
		let items = availableCurrencies;
		const currenciesCollection = derived(() => useListCollection({ items }));
		const onInputValueChange = (event) => {
			items = availableCurrencies.filter((item) => item.includes(event.inputValue.toLocaleUpperCase()));
		};
		$$renderer.push(`<div class="input-group grid-cols-[auto_1fr_auto]"><div class="ig-cell preset-tonal"><iconify-icon icon="ion:pricetag"></iconify-icon></div> <input${attr("id", `formatted-${id}`)}${attr("name", `formatted-${name}`)} class="ig-input" autocomplete="off"${attr("disabled", disabled, true)}${attr("inputmode", maximumFractionDigits() > 0 ? "decimal" : "numeric")}${attr("placeholder", priceFormatter().format(0))} type="text"${attr("value", displayValue)}/> `);
		Combobox($$renderer, {
			class: "w-22",
			alwaysSubmitOnEnter: false,
			collection: currenciesCollection(),
			"data-testid": "currency",
			inputBehavior: "autohighlight",
			onInputValueChange,
			onOpenChange: () => items = availableCurrencies,
			onValueChange: (e) => currency = e.value[0],
			openOnClick: true,
			required: true,
			value: [currency],
			children: ($$renderer) => {
				if (Combobox.Control) {
					$$renderer.push("<!--[-->");
					Combobox.Control($$renderer, {
						children: ($$renderer) => {
							{
								function element($$renderer, props) {
									$$renderer.push(`<input${attributes({
										...props,
										name: "currency",
										class: "ig-input rounded-s-none uppercase ring-0 focus:ring-1"
									}, void 0, void 0, void 0, 4)}/>`);
								}
								if (Combobox.Input) {
									$$renderer.push("<!--[-->");
									Combobox.Input($$renderer, {
										element,
										$$slots: { element: true }
									});
									$$renderer.push("<!--]-->");
								} else {
									$$renderer.push("<!--[!-->");
									$$renderer.push("<!--]-->");
								}
							}
							$$renderer.push(` `);
							if (Combobox.Trigger) {
								$$renderer.push("<!--[-->");
								Combobox.Trigger($$renderer, { class: "bg-transparent" });
								$$renderer.push("<!--]-->");
							} else {
								$$renderer.push("<!--[!-->");
								$$renderer.push("<!--]-->");
							}
						},
						$$slots: { default: true }
					});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
				$$renderer.push(` `);
				Portal($$renderer, {
					children: ($$renderer) => {
						if (Combobox.Positioner) {
							$$renderer.push("<!--[-->");
							Combobox.Positioner($$renderer, {
								children: ($$renderer) => {
									if (Combobox.Content) {
										$$renderer.push("<!--[-->");
										Combobox.Content($$renderer, {
											class: "max-h-80 overflow-auto",
											children: ($$renderer) => {
												const each_array = ensure_array_like(items);
												if (each_array.length !== 0) {
													$$renderer.push("<!--[-->");
													for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
														let item = each_array[$$index];
														if (Combobox.Item) {
															$$renderer.push("<!--[-->");
															Combobox.Item($$renderer, {
																item,
																children: ($$renderer) => {
																	if (Combobox.ItemText) {
																		$$renderer.push("<!--[-->");
																		Combobox.ItemText($$renderer, {
																			children: ($$renderer) => {
																				$$renderer.push(`<!---->${escape_html(item)}`);
																			},
																			$$slots: { default: true }
																		});
																		$$renderer.push("<!--]-->");
																	} else {
																		$$renderer.push("<!--[!-->");
																		$$renderer.push("<!--]-->");
																	}
																	$$renderer.push(` `);
																	if (Combobox.ItemIndicator) {
																		$$renderer.push("<!--[-->");
																		Combobox.ItemIndicator($$renderer, {});
																		$$renderer.push("<!--]-->");
																	} else {
																		$$renderer.push("<!--[!-->");
																		$$renderer.push("<!--]-->");
																	}
																},
																$$slots: { default: true }
															});
															$$renderer.push("<!--]-->");
														} else {
															$$renderer.push("<!--[!-->");
															$$renderer.push("<!--]-->");
														}
													}
												} else $$renderer.push(`<!--[!--><span>No currencies available.</span>`);
												$$renderer.push(`<!--]-->`);
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!---->`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div> <input${attr("id", id)}${attr("name", name)}${attr("disabled", disabled, true)} type="hidden"${attr("value", value)}/>`);
		bind_props($$props, {
			value,
			currency
		});
	});
}
// src/lib/components/FileUpload.svelte
function FileUpload_1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { $$slots, $$events, ...props } = $$props;
		const t = getFormatter();
		FileUpload($$renderer, spread_props([props, {
			class: "input-group grid-cols-[auto_1fr] items-center p-1",
			children: ($$renderer) => {
				if (FileUpload.Trigger) {
					$$renderer.push("<!--[-->");
					FileUpload.Trigger($$renderer, {
						class: "btn btn-sm preset-filled h-fit",
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.select-file"))}`);
						},
						$$slots: { default: true }
					});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
				$$renderer.push(` `);
				if (FileUpload.HiddenInput) {
					$$renderer.push("<!--[-->");
					FileUpload.HiddenInput($$renderer, {});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
				$$renderer.push(` `);
				if (FileUpload.ItemGroup) {
					$$renderer.push("<!--[-->");
					FileUpload.ItemGroup($$renderer, {
						children: ($$renderer) => {
							{
								function children($$renderer, fileUpload) {
									if (fileUpload().acceptedFiles.length === 1) {
										$$renderer.push("<!--[0-->");
										const file = fileUpload().acceptedFiles.at(0);
										if (FileUpload.Item) {
											$$renderer.push("<!--[-->");
											FileUpload.Item($$renderer, {
												file,
												children: ($$renderer) => {
													if (FileUpload.ItemName) {
														$$renderer.push("<!--[-->");
														FileUpload.ItemName($$renderer, {
															class: "truncate",
															children: ($$renderer) => {
																$$renderer.push(`<!---->${escape_html(file.name)}`);
															},
															$$slots: { default: true }
														});
														$$renderer.push("<!--]-->");
													} else {
														$$renderer.push("<!--[!-->");
														$$renderer.push("<!--]-->");
													}
													$$renderer.push(` `);
													if (FileUpload.ItemDeleteTrigger) {
														$$renderer.push("<!--[-->");
														FileUpload.ItemDeleteTrigger($$renderer, {});
														$$renderer.push("<!--]-->");
													} else {
														$$renderer.push("<!--[!-->");
														$$renderer.push("<!--]-->");
													}
												},
												$$slots: { default: true }
											});
											$$renderer.push("<!--]-->");
										} else {
											$$renderer.push("<!--[!-->");
											$$renderer.push("<!--]-->");
										}
									} else $$renderer.push(`<!--[-1--><span class="pl-2 text-base">${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.no-file-selected"))}</span>`);
									$$renderer.push(`<!--]-->`);
								}
								if (FileUpload.Context) {
									$$renderer.push("<!--[-->");
									FileUpload.Context($$renderer, {
										children,
										$$slots: { default: true }
									});
									$$renderer.push("<!--]-->");
								} else {
									$$renderer.push("<!--[!-->");
									$$renderer.push("<!--]-->");
								}
							}
						},
						$$slots: { default: true }
					});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
			},
			$$slots: { default: true }
		}]));
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/wishlists/ItemForm.svelte
function ItemForm($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { userId, item = void 0, buttonText, lists: otherLists, currentList, saving = false, namePlaceholder } = $$props;
		const t = getFormatter();
		let productData = item;
		let showNote = !!item.note;
		let form = derived(() => page.form);
		let price = getPriceValue(productData);
		const defaultCurrency = getDefaultCurrency();
		let userCurrency = derived(() => productData.itemPrice?.currency || defaultCurrency);
		let quantity = item.quantity || 1;
		let unlimited = item.quantity === null;
		const listsHavingItem = derived(() => {
			return productData.lists ? productData.lists.reduce((accum, list) => {
				accum[list.id] = list.canModify;
				return accum;
			}, {}) : { [currentList || ""]: true };
		});
		const lists = derived(() => {
			function nameAndSortLists(lists) {
				if (!lists) return [];
				return lists.map((l) => ({
					...l,
					name: l.name || store_get($$store_subs ??= {}, "$t", t)("wishes.wishes-for", { values: { listOwner: l.owner.name } })
				})).toSorted((a, b) => listsHavingItem()[a.id] !== void 0 ? -Infinity : listsHavingItem()[b.id] !== void 0 ? Infinity : a.name?.localeCompare(b.name));
			}
			return {
				usersLists: nameAndSortLists(otherLists?.usersLists),
				managedLists: nameAndSortLists(otherLists?.managedLists)
			};
		});
		function displayList($$renderer, list) {
			$$renderer.push(`<label class="flex items-center gap-x-2"${attr("for", list.id)}><input${attr("id", list.id)} name="lists" class="checkbox"${attr("checked", listsHavingItem()[list.id] !== void 0, true)}${attr("disabled", listsHavingItem()[list.id] === false, true)} type="checkbox"${attr("value", list.id)}/> <div class="mt-0! flex flex-row gap-x-2"><span>${escape_html(list.name)}</span> <span class="font-bold italic">(${escape_html(list.group.name)})</span></div></label>`);
		}
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div class="paper-fields paper-item-form"><div class="paper-field"><label class="paper-label" for="name">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.idea-label"))}</label> <input id="name" name="name"${attr_class("input paper-item-title", void 0, { "input-invalid": form()?.errors?.name })} autocomplete="off"${attr("placeholder", namePlaceholder)} required="" type="text"${attr("value", productData.name)}/> `);
			if (form()?.errors?.name) $$renderer.push(`<!--[0--><p class="text-invalid pt-2">${escape_html(form().errors.name[0])}</p>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div class="paper-field">`);
			if (showNote) {
				$$renderer.push(`<!--[0--><label class="paper-label" for="note">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.note-label"))}</label> <textarea id="note" name="note" class="input paper-item-note"${attr("placeholder", store_get($$store_subs ??= {}, "$t", t)("wishes.note-placeholder"))} rows="2">`);
				const $$body = escape_html(productData.note ?? "");
				if ($$body) $$renderer.push(`${$$body}`);
				$$renderer.push(`</textarea>`);
			} else $$renderer.push(`<!--[-1--><button id="add-note" class="paper-link paper-add-note" type="button">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.add-note"))}</button>`);
			$$renderer.push(`<!--]--></div> <div class="hidden" aria-hidden="true"><label class="label col-span-full" for="url"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.item-url"))}</span> <div class="flex flex-row gap-x-4"><div class="input-group w-full grid-cols-[auto_1fr_auto]"><div class="ig-cell preset-tonal"><iconify-icon icon="ion:link"></iconify-icon></div> <input id="url" name="url" class="ig-input"${attr("placeholder", store_get($$store_subs ??= {}, "$t", t)("wishes.url-placeholder"))} type="url"${attr("value", productData.url)}/> `);
			if (productData.url) $$renderer.push(`<!--[0--><button id="reset-field" class="ig-cell"${attr("aria-label", store_get($$store_subs ??= {}, "$t", t)("a11y.clear-url-field"))} tabindex="-1" type="button"><iconify-icon icon="ion:close-circle"></iconify-icon></button>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			if (productData.url) $$renderer.push(`<!--[0--><button id="refresh-item" class="preset-tonal-primary border-primary-500 btn btn-icon border"${attr("aria-label", store_get($$store_subs ??= {}, "$t", t)("a11y.refresh-item-data"))} tabindex="-1" type="button"><iconify-icon icon="ion:refresh"></iconify-icon></button>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></label> <label class="label col-span-full sm:col-span-4 xl:col-span-2" for="price"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.price"))}</span> `);
			CurrencyInput($$renderer, {
				id: "price",
				name: "price",
				currency: userCurrency(),
				get value() {
					return price;
				},
				set value($$value) {
					price = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----></label> <div class="label col-span-full sm:col-span-3 xl:col-span-2"><label class="pb-1" for="quantity"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.quantity"))}</span></label> <div class="flex flex-row items-center gap-2"><div class="grow"><div class="input-group grid-cols-[auto_1fr]"><div class="ig-cell preset-tonal"><iconify-icon icon="ion:gift"></iconify-icon></div> <input${attributes({
				id: "quantity",
				name: "quantity",
				class: "ig-input w-0 min-w-full",
				autocomplete: "off",
				defaultvalue: 1,
				disabled: unlimited,
				inputmode: "numeric",
				max: "999",
				min: "1",
				required: unlimited ? false : true,
				step: "1",
				type: unlimited ? "text" : "number",
				value: unlimited ? store_get($$store_subs ??= {}, "$t", t)("general.na") : quantity
			}, void 0, void 0, void 0, 4)}/></div></div> <label class="checkbox-label w-fit" for="unlimited"><input id="unlimited" class="checkbox" type="checkbox"${attr("checked", unlimited, true)}/> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.no-limit"))}</span></label></div> `);
			if (form()?.errors?.quantity) $$renderer.push(`<!--[0--><p class="text-invalid">${escape_html(form().errors.quantity[0])}</p>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <label class="label col-span-full md:col-span-3" for="image"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.upload-image"))}</span> `);
			FileUpload_1($$renderer, {
				name: "image",
				class: "py-1 pl-1",
				accept: "image/*"
			});
			$$renderer.push(`<!----></label> <label class="label col-span-full md:col-span-4" for="imageUrl"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.image-url"))}</span> <div class="input-group grid-cols-[auto_1fr]"><div class="ig-cell preset-tonal"><iconify-icon icon="ion:image"></iconify-icon></div> <input id="imageUrl" name="imageUrl" class="ig-input" autocomplete="off" type="text"${attr("value", productData.imageUrl)}/></div></label> <div class="col-span-full"><label class="checkbox-label w-fit" for="mostWanted"><input id="mostWanted" name="mostWanted" class="checkbox"${attr("checked", item.mostWanted, true)} type="checkbox"/> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.most-wanted"))}</span></label> <span class="subtext">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.most-wanted-description"))}</span></div> <fieldset${attr_class(clsx(["col-span-full flex flex-col space-y-2 md:col-span-5", lists().usersLists.length + lists().managedLists.length <= 1 && "hidden"]))} aria-labelledby="lists-label"><div class="flex items-end justify-between"><legend id="lists-label">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.lists"))}</legend> `);
			if (!item.createdById || item.createdById === userId) $$renderer.push(`<!--[0--><button class="preset-tonal-primary border-primary-500 btn btn-sm border" type="button">${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.select-all"))}</button>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			if (item.createdById && item.createdById !== userId) $$renderer.push(`<!--[0--><p class="text-warning-800-200 text-sm">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.cannot-update-lists-of-item"))}</p>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div${attr_class(clsx([
				"border-surface-500 rounded-container flex h-36 flex-col space-y-2 overflow-auto border p-2",
				form()?.errors?.lists && "input-invalid",
				item.createdById && item.createdById !== userId && "disabled"
			]))}><!--[-->`);
			const each_array = ensure_array_like(lists().usersLists);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let list = each_array[$$index];
				displayList($$renderer, list);
			}
			$$renderer.push(`<!--]--> <!--[-->`);
			const each_array_1 = ensure_array_like(lists().managedLists);
			for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
				let list = each_array_1[i];
				if (i === 0) $$renderer.push(`<!--[0--><span class="text-subtle">Managed lists</span>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				displayList($$renderer, list);
				$$renderer.push(`<!---->`);
			}
			$$renderer.push(`<!--]--></div> `);
			if (form()?.errors?.lists) $$renderer.push(`<!--[0--><p class="text-invalid">${escape_html(form().errors.lists[0])}</p>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></fieldset></div> <div class="paper-item-actions"><button class="paper-link"${attr("disabled", saving, true)} type="button">${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.cancel"))}</button> <button id="submit" class="paper-primary paper-item-submit"${attr("disabled", saving, true)} type="submit">${escape_html(buttonText)}</button></div></div> `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		if ($$store_subs) unsubscribe_stores($$store_subs);
		bind_props($$props, { item });
	});
}

export { ItemForm as I };
//# sourceMappingURL=ItemForm.js-D9OPOqUR.js.map
