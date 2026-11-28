import { at as head, V as derived, au as attr, av as store_get, aw as ensure_array_like, ao as escape_html, ax as unsubscribe_stores, ay as attr_class, am as clsx, ak as attributes, aj as props_id, ah as fallback, al as exclude_from_object, ap as html, az as attr_style, aA as state, X as render_effect, c as set, g as get, ai as spread_props } from '../../chunks/index-server.js-CIVHNbBm.js';
import { A as APP_NAME } from '../../chunks/brand.js-Bvcb6EDF.js';
import { b as beforeNavigate, a as afterNavigate, g as goto } from '../../chunks/client.js-CtfT808N.js';
import { p as page } from '../../chunks/state.js-DFeh0alp.js';
import { R as Role } from '../../chunks/schema.js-_174nGak.js';
import { r as resolve } from '../../chunks/paths.js-BuehRTbY.js';
import { U as UserAPI } from '../../chunks/users.js-DwrjtQr5.js';
import { s as setFormatter, e as setLocale, f as getFormatter, h as getLocale } from '../../chunks/i18n2.js-1SlG2bAu.js';
import { B as BaseModal, D as Dialog } from '../../chunks/BaseModal.js-_UDlR-j4.js';
import { L as Listbox } from '../../chunks/anatomy5.js-STbBfBjf.js';
import { u as useListCollection } from '../../chunks/use-list-collection.js-brFPftRE.js';
import { P as Popup } from '../../chunks/Popup.js-CGmgV3d5.js';
import { c as cubicOut, l as linear } from '../../chunks/easing.js-DDzfzEMG.js';
import { l as loop, r as raf$1 } from '../../chunks/attachments.js-DNhXZ-Re.js';
import { x as useMachine, y as createContext, z as mergeProps, E as normalizeProps, B as dataAttr, a as addDomEvent, Z as AnimationFrame, c as contains, C as createAnatomy, I as setup, _ as MAX_Z_INDEX, A as createMachine$1, r as raf, $ as createGuards } from '../../chunks/create-anatomy.js-CLhpGM8y.js';
import { e as trackDismissableBranch } from '../../chunks/anatomy2.js-Deb7OEEc.js';
import { u as uuid, l as ensureProps } from '../../chunks/warning.js-12YgogjO.js';
import { t as toaster } from '../../chunks/toaster.js-DRl3MQi1.js';
import '../../chunks/routing.js-DMTqwvGY.js';
import '../../chunks/shared.js-Cb68JbUk.js';
import '../../chunks/exports.js-BBf-2Qi_.js';
import '../../chunks/internal2.js-CM4IiAcJ.js';
import '../../chunks/utils.js-CAPFIGDr.js';
import '../../chunks/internal.js-B0ORXlkz.js';
import '../../chunks/index-server2.js-DZFYXfYm.js';
import '../../chunks/dist.js-BvNxsp9_.js';
import '../../chunks/equal.js-nd5Stm03.js';
import '../../chunks/dist2.js-Cjb_BOMc.js';
import '../../chunks/anatomy3.js-HwVFkfZZ.js';
import '../../chunks/get-styles.js-Boa-8w4M.js';

/**
* (c) Iconify
*
* For the full copyright and license information, please view the license.txt
* files at https://github.com/iconify/iconify
*
* Licensed under MIT.
*
* @license MIT
* @version 2.2.0
*/
const defaultIconDimensions = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
);
const defaultIconTransformations = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
const defaultIconProps = Object.freeze({
  ...defaultIconDimensions,
  ...defaultIconTransformations
});
const defaultExtendedIconProps = Object.freeze({
  ...defaultIconProps,
  body: "",
  hidden: false
});

const defaultIconSizeCustomisations = Object.freeze({
  width: null,
  height: null
});
const defaultIconCustomisations = Object.freeze({
  // Dimensions
  ...defaultIconSizeCustomisations,
  // Transformations
  ...defaultIconTransformations
});

function rotateFromString(value, defaultValue = 0) {
  const units = value.replace(/^-?[0-9.]*/, "");
  function cleanup(value2) {
    while (value2 < 0) {
      value2 += 4;
    }
    return value2 % 4;
  }
  if (units === "") {
    const num = parseInt(value);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units !== value) {
    let split = 0;
    switch (units) {
      case "%":
        split = 25;
        break;
      case "deg":
        split = 90;
    }
    if (split) {
      let num = parseFloat(value.slice(0, value.length - units.length));
      if (isNaN(num)) {
        return 0;
      }
      num = num / split;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}

const separator = /[\s,]+/;
function flipFromString(custom, flip) {
  flip.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
        break;
    }
  });
}

const defaultCustomisations = {
    ...defaultIconCustomisations,
    preserveAspectRatio: '',
};
/**
 * Get customisations
 */
function getCustomisations(node) {
    const customisations = {
        ...defaultCustomisations,
    };
    const attr = (key, def) => node.getAttribute(key) || def;
    // Dimensions
    customisations.width = attr('width', null);
    customisations.height = attr('height', null);
    // Rotation
    customisations.rotate = rotateFromString(attr('rotate', ''));
    // Flip
    flipFromString(customisations, attr('flip', ''));
    // SVG attributes
    customisations.preserveAspectRatio = attr('preserveAspectRatio', attr('preserveaspectratio', ''));
    return customisations;
}
/**
 * Check if customisations have been updated
 */
function haveCustomisationsChanged(value1, value2) {
    for (const key in defaultCustomisations) {
        if (value1[key] !== value2[key]) {
            return true;
        }
    }
    return false;
}

const matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const stringToIcon = (value, validate, allowSimpleName, provider = "") => {
  const colonSeparated = value.split(":");
  if (value.slice(0, 1) === "@") {
    if (colonSeparated.length < 2 || colonSeparated.length > 3) {
      return null;
    }
    provider = colonSeparated.shift().slice(1);
  }
  if (colonSeparated.length > 3 || !colonSeparated.length) {
    return null;
  }
  if (colonSeparated.length > 1) {
    const name2 = colonSeparated.pop();
    const prefix = colonSeparated.pop();
    const result = {
      // Allow provider without '@': "provider:prefix:name"
      provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
      prefix,
      name: name2
    };
    return validate && !validateIconName(result) ? null : result;
  }
  const name = colonSeparated[0];
  const dashSeparated = name.split("-");
  if (dashSeparated.length > 1) {
    const result = {
      provider,
      prefix: dashSeparated.shift(),
      name: dashSeparated.join("-")
    };
    return validate && !validateIconName(result) ? null : result;
  }
  if (allowSimpleName && provider === "") {
    const result = {
      provider,
      prefix: "",
      name
    };
    return validate && !validateIconName(result, allowSimpleName) ? null : result;
  }
  return null;
};
const validateIconName = (icon, allowSimpleName) => {
  if (!icon) {
    return false;
  }
  return !!// Check prefix: cannot be empty, unless allowSimpleName is enabled
  // Check name: cannot be empty
  ((allowSimpleName && icon.prefix === "" || !!icon.prefix) && !!icon.name);
};

function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) {
    result.hFlip = true;
  }
  if (!obj1.vFlip !== !obj2.vFlip) {
    result.vFlip = true;
  }
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) {
    result.rotate = rotate;
  }
  return result;
}

function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key in defaultExtendedIconProps) {
    if (key in defaultIconTransformations) {
      if (key in parent && !(key in result)) {
        result[key] = defaultIconTransformations[key];
      }
    } else if (key in child) {
      result[key] = child[key];
    } else if (key in parent) {
      result[key] = parent[key];
    }
  }
  return result;
}

function getIconsTree(data, names) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve(name) {
    if (icons[name]) {
      return resolved[name] = [];
    }
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value = parent && resolve(parent);
      if (value) {
        resolved[name] = [parent].concat(value);
      }
    }
    return resolved[name];
  }
  (Object.keys(icons).concat(Object.keys(aliases))).forEach(resolve);
  return resolved;
}

function internalGetIconData(data, name, tree) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  let currentProps = {};
  function parse(name2) {
    currentProps = mergeIconData(
      icons[name2] || aliases[name2],
      currentProps
    );
  }
  parse(name);
  tree.forEach(parse);
  return mergeIconData(data, currentProps);
}

function parseIconSet(data, callback) {
  const names = [];
  if (typeof data !== "object" || typeof data.icons !== "object") {
    return names;
  }
  if (data.not_found instanceof Array) {
    data.not_found.forEach((name) => {
      callback(name, null);
      names.push(name);
    });
  }
  const tree = getIconsTree(data);
  for (const name in tree) {
    const item = tree[name];
    if (item) {
      callback(name, internalGetIconData(data, name, item));
      names.push(name);
    }
  }
  return names;
}

const optionalPropertyDefaults = {
  provider: "",
  aliases: {},
  not_found: {},
  ...defaultIconDimensions
};
function checkOptionalProps(item, defaults) {
  for (const prop in defaults) {
    if (prop in item && typeof item[prop] !== typeof defaults[prop]) {
      return false;
    }
  }
  return true;
}
function quicklyValidateIconSet(obj) {
  if (typeof obj !== "object" || obj === null) {
    return null;
  }
  const data = obj;
  if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") {
    return null;
  }
  if (!checkOptionalProps(obj, optionalPropertyDefaults)) {
    return null;
  }
  const icons = data.icons;
  for (const name in icons) {
    const icon = icons[name];
    if (
      // Name cannot be empty
      !name || // Must have body
      typeof icon.body !== "string" || // Check other props
      !checkOptionalProps(
        icon,
        defaultExtendedIconProps
      )
    ) {
      return null;
    }
  }
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  for (const name in aliases) {
    const icon = aliases[name];
    const parent = icon.parent;
    if (
      // Name cannot be empty
      !name || // Parent must be set and point to existing icon
      typeof parent !== "string" || !icons[parent] && !aliases[parent] || // Check other props
      !checkOptionalProps(
        icon,
        defaultExtendedIconProps
      )
    ) {
      return null;
    }
  }
  return data;
}

const dataStorage = /* @__PURE__ */ Object.create(null);
function newStorage(provider, prefix) {
  return {
    provider,
    prefix,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function getStorage(provider, prefix) {
  const providerStorage = dataStorage[provider] || (dataStorage[provider] = /* @__PURE__ */ Object.create(null));
  return providerStorage[prefix] || (providerStorage[prefix] = newStorage(provider, prefix));
}
function addIconSet(storage, data) {
  if (!quicklyValidateIconSet(data)) {
    return [];
  }
  return parseIconSet(data, (name, icon) => {
    if (icon) {
      storage.icons[name] = icon;
    } else {
      storage.missing.add(name);
    }
  });
}
function addIconToStorage(storage, name, icon) {
  try {
    if (typeof icon.body === "string") {
      storage.icons[name] = { ...icon };
      return true;
    }
  } catch (err) {
  }
  return false;
}
function listIcons$1(provider, prefix) {
  let allIcons = [];
  const providers = typeof provider === "string" ? [provider] : Object.keys(dataStorage);
  providers.forEach((provider2) => {
    const prefixes = typeof provider2 === "string" && typeof prefix === "string" ? [prefix] : Object.keys(dataStorage[provider2] || {});
    prefixes.forEach((prefix2) => {
      const storage = getStorage(provider2, prefix2);
      allIcons = allIcons.concat(
        Object.keys(storage.icons).map(
          (name) => (provider2 !== "" ? "@" + provider2 + ":" : "") + prefix2 + ":" + name
        )
      );
    });
  });
  return allIcons;
}

let simpleNames = false;
function allowSimpleNames(allow) {
  if (typeof allow === "boolean") {
    simpleNames = allow;
  }
  return simpleNames;
}
function getIconData(name) {
  const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
  if (icon) {
    const storage = getStorage(icon.provider, icon.prefix);
    const iconName = icon.name;
    return storage.icons[iconName] || (storage.missing.has(iconName) ? null : void 0);
  }
}
function addIcon$1(name, data) {
  const icon = stringToIcon(name, true, simpleNames);
  if (!icon) {
    return false;
  }
  const storage = getStorage(icon.provider, icon.prefix);
  if (data) {
    return addIconToStorage(storage, icon.name, data);
  } else {
    storage.missing.add(icon.name);
    return true;
  }
}
function addCollection$1(data, provider) {
  if (typeof data !== "object") {
    return false;
  }
  if (typeof provider !== "string") {
    provider = data.provider || "";
  }
  if (simpleNames && !provider && !data.prefix) {
    let added = false;
    if (quicklyValidateIconSet(data)) {
      data.prefix = "";
      parseIconSet(data, (name, icon) => {
        if (addIcon$1(name, icon)) {
          added = true;
        }
      });
    }
    return added;
  }
  const prefix = data.prefix;
  if (!validateIconName({
    prefix,
    name: "a"
  })) {
    return false;
  }
  const storage = getStorage(provider, prefix);
  return !!addIconSet(storage, data);
}
function iconLoaded$1(name) {
  return !!getIconData(name);
}
function getIcon$1(name) {
  const result = getIconData(name);
  return result ? {
    ...defaultIconProps,
    ...result
  } : result;
}

function sortIcons(icons) {
  const result = {
    loaded: [],
    missing: [],
    pending: []
  };
  const storage = /* @__PURE__ */ Object.create(null);
  icons.sort((a, b) => {
    if (a.provider !== b.provider) {
      return a.provider.localeCompare(b.provider);
    }
    if (a.prefix !== b.prefix) {
      return a.prefix.localeCompare(b.prefix);
    }
    return a.name.localeCompare(b.name);
  });
  let lastIcon = {
    provider: "",
    prefix: "",
    name: ""
  };
  icons.forEach((icon) => {
    if (lastIcon.name === icon.name && lastIcon.prefix === icon.prefix && lastIcon.provider === icon.provider) {
      return;
    }
    lastIcon = icon;
    const provider = icon.provider;
    const prefix = icon.prefix;
    const name = icon.name;
    const providerStorage = storage[provider] || (storage[provider] = /* @__PURE__ */ Object.create(null));
    const localStorage = providerStorage[prefix] || (providerStorage[prefix] = getStorage(provider, prefix));
    let list;
    if (name in localStorage.icons) {
      list = result.loaded;
    } else if (prefix === "" || localStorage.missing.has(name)) {
      list = result.missing;
    } else {
      list = result.pending;
    }
    const item = {
      provider,
      prefix,
      name
    };
    list.push(item);
  });
  return result;
}

function removeCallback(storages, id) {
  storages.forEach((storage) => {
    const items = storage.loaderCallbacks;
    if (items) {
      storage.loaderCallbacks = items.filter((row) => row.id !== id);
    }
  });
}
function updateCallbacks(storage) {
  if (!storage.pendingCallbacksFlag) {
    storage.pendingCallbacksFlag = true;
    setTimeout(() => {
      storage.pendingCallbacksFlag = false;
      const items = storage.loaderCallbacks ? storage.loaderCallbacks.slice(0) : [];
      if (!items.length) {
        return;
      }
      let hasPending = false;
      const provider = storage.provider;
      const prefix = storage.prefix;
      items.forEach((item) => {
        const icons = item.icons;
        const oldLength = icons.pending.length;
        icons.pending = icons.pending.filter((icon) => {
          if (icon.prefix !== prefix) {
            return true;
          }
          const name = icon.name;
          if (storage.icons[name]) {
            icons.loaded.push({
              provider,
              prefix,
              name
            });
          } else if (storage.missing.has(name)) {
            icons.missing.push({
              provider,
              prefix,
              name
            });
          } else {
            hasPending = true;
            return true;
          }
          return false;
        });
        if (icons.pending.length !== oldLength) {
          if (!hasPending) {
            removeCallback([storage], item.id);
          }
          item.callback(
            icons.loaded.slice(0),
            icons.missing.slice(0),
            icons.pending.slice(0),
            item.abort
          );
        }
      });
    });
  }
}
let idCounter = 0;
function storeCallback(callback, icons, pendingSources) {
  const id = idCounter++;
  const abort = removeCallback.bind(null, pendingSources, id);
  if (!icons.pending.length) {
    return abort;
  }
  const item = {
    id,
    icons,
    callback,
    abort
  };
  pendingSources.forEach((storage) => {
    (storage.loaderCallbacks || (storage.loaderCallbacks = [])).push(item);
  });
  return abort;
}

const storage = /* @__PURE__ */ Object.create(null);
function setAPIModule(provider, item) {
  storage[provider] = item;
}
function getAPIModule(provider) {
  return storage[provider] || storage[""];
}

function listToIcons(list, validate = true, simpleNames = false) {
  const result = [];
  list.forEach((item) => {
    const icon = typeof item === "string" ? stringToIcon(item, validate, simpleNames) : item;
    if (icon) {
      result.push(icon);
    }
  });
  return result;
}

// src/config.ts
var defaultConfig = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: false,
  dataAfterTimeout: false
};

// src/query.ts
function sendQuery(config, payload, query, done) {
  const resourcesCount = config.resources.length;
  const startIndex = config.random ? Math.floor(Math.random() * resourcesCount) : config.index;
  let resources;
  if (config.random) {
    let list = config.resources.slice(0);
    resources = [];
    while (list.length > 1) {
      const nextIndex = Math.floor(Math.random() * list.length);
      resources.push(list[nextIndex]);
      list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
    }
    resources = resources.concat(list);
  } else {
    resources = config.resources.slice(startIndex).concat(config.resources.slice(0, startIndex));
  }
  const startTime = Date.now();
  let status = "pending";
  let queriesSent = 0;
  let lastError;
  let timer = null;
  let queue = [];
  let doneCallbacks = [];
  if (typeof done === "function") {
    doneCallbacks.push(done);
  }
  function resetTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function abort() {
    if (status === "pending") {
      status = "aborted";
    }
    resetTimer();
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function subscribe(callback, overwrite) {
    if (overwrite) {
      doneCallbacks = [];
    }
    if (typeof callback === "function") {
      doneCallbacks.push(callback);
    }
  }
  function getQueryStatus() {
    return {
      startTime,
      payload,
      status,
      queriesSent,
      queriesPending: queue.length,
      subscribe,
      abort
    };
  }
  function failQuery() {
    status = "failed";
    doneCallbacks.forEach((callback) => {
      callback(void 0, lastError);
    });
  }
  function clearQueue() {
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function moduleResponse(item, response, data) {
    const isError = response !== "success";
    queue = queue.filter((queued) => queued !== item);
    switch (status) {
      case "pending":
        break;
      case "failed":
        if (isError || !config.dataAfterTimeout) {
          return;
        }
        break;
      default:
        return;
    }
    if (response === "abort") {
      lastError = data;
      failQuery();
      return;
    }
    if (isError) {
      lastError = data;
      if (!queue.length) {
        if (!resources.length) {
          failQuery();
        } else {
          execNext();
        }
      }
      return;
    }
    resetTimer();
    clearQueue();
    if (!config.random) {
      const index = config.resources.indexOf(item.resource);
      if (index !== -1 && index !== config.index) {
        config.index = index;
      }
    }
    status = "completed";
    doneCallbacks.forEach((callback) => {
      callback(data);
    });
  }
  function execNext() {
    if (status !== "pending") {
      return;
    }
    resetTimer();
    const resource = resources.shift();
    if (resource === void 0) {
      if (queue.length) {
        timer = setTimeout(() => {
          resetTimer();
          if (status === "pending") {
            clearQueue();
            failQuery();
          }
        }, config.timeout);
        return;
      }
      failQuery();
      return;
    }
    const item = {
      status: "pending",
      resource,
      callback: (status2, data) => {
        moduleResponse(item, status2, data);
      }
    };
    queue.push(item);
    queriesSent++;
    timer = setTimeout(execNext, config.rotate);
    query(resource, payload, item.callback);
  }
  setTimeout(execNext);
  return getQueryStatus;
}

// src/index.ts
function initRedundancy(cfg) {
  const config = {
    ...defaultConfig,
    ...cfg
  };
  let queries = [];
  function cleanup() {
    queries = queries.filter((item) => item().status === "pending");
  }
  function query(payload, queryCallback, doneCallback) {
    const query2 = sendQuery(
      config,
      payload,
      queryCallback,
      (data, error) => {
        cleanup();
        if (doneCallback) {
          doneCallback(data, error);
        }
      }
    );
    queries.push(query2);
    return query2;
  }
  function find(callback) {
    return queries.find((value) => {
      return callback(value);
    }) || null;
  }
  const instance = {
    query,
    find,
    setIndex: (index) => {
      config.index = index;
    },
    getIndex: () => config.index,
    cleanup
  };
  return instance;
}

function createAPIConfig(source) {
  let resources;
  if (typeof source.resources === "string") {
    resources = [source.resources];
  } else {
    resources = source.resources;
    if (!(resources instanceof Array) || !resources.length) {
      return null;
    }
  }
  const result = {
    // API hosts
    resources,
    // Root path
    path: source.path || "/",
    // URL length limit
    maxURL: source.maxURL || 500,
    // Timeout before next host is used.
    rotate: source.rotate || 750,
    // Timeout before failing query.
    timeout: source.timeout || 5e3,
    // Randomise default API end point.
    random: source.random === true,
    // Start index
    index: source.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: source.dataAfterTimeout !== false
  };
  return result;
}
const configStorage = /* @__PURE__ */ Object.create(null);
const fallBackAPISources = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
];
const fallBackAPI = [];
while (fallBackAPISources.length > 0) {
  if (fallBackAPISources.length === 1) {
    fallBackAPI.push(fallBackAPISources.shift());
  } else {
    if (Math.random() > 0.5) {
      fallBackAPI.push(fallBackAPISources.shift());
    } else {
      fallBackAPI.push(fallBackAPISources.pop());
    }
  }
}
configStorage[""] = createAPIConfig({
  resources: ["https://api.iconify.design"].concat(fallBackAPI)
});
function addAPIProvider$1(provider, customConfig) {
  const config = createAPIConfig(customConfig);
  if (config === null) {
    return false;
  }
  configStorage[provider] = config;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
function listAPIProviders() {
  return Object.keys(configStorage);
}

function emptyCallback$1() {
}
const redundancyCache = /* @__PURE__ */ Object.create(null);
function getRedundancyCache(provider) {
  if (!redundancyCache[provider]) {
    const config = getAPIConfig(provider);
    if (!config) {
      return;
    }
    const redundancy = initRedundancy(config);
    const cachedReundancy = {
      config,
      redundancy
    };
    redundancyCache[provider] = cachedReundancy;
  }
  return redundancyCache[provider];
}
function sendAPIQuery(target, query, callback) {
  let redundancy;
  let send;
  if (typeof target === "string") {
    const api = getAPIModule(target);
    if (!api) {
      callback(void 0, 424);
      return emptyCallback$1;
    }
    send = api.send;
    const cached = getRedundancyCache(target);
    if (cached) {
      redundancy = cached.redundancy;
    }
  } else {
    const config = createAPIConfig(target);
    if (config) {
      redundancy = initRedundancy(config);
      const moduleKey = target.resources ? target.resources[0] : "";
      const api = getAPIModule(moduleKey);
      if (api) {
        send = api.send;
      }
    }
  }
  if (!redundancy || !send) {
    callback(void 0, 424);
    return emptyCallback$1;
  }
  return redundancy.query(query, send, callback)().abort;
}

const browserCacheVersion = "iconify2";
const browserCachePrefix = "iconify";
const browserCacheCountKey = browserCachePrefix + "-count";
const browserCacheVersionKey = browserCachePrefix + "-version";
const browserStorageHour = 36e5;
const browserStorageCacheExpiration = 168;
const browserStorageLimit = 50;

function getStoredItem(func, key) {
  try {
    return func.getItem(key);
  } catch (err) {
  }
}
function setStoredItem(func, key, value) {
  try {
    func.setItem(key, value);
    return true;
  } catch (err) {
  }
}
function removeStoredItem(func, key) {
  try {
    func.removeItem(key);
  } catch (err) {
  }
}

function setBrowserStorageItemsCount(storage, value) {
  return setStoredItem(storage, browserCacheCountKey, value.toString());
}
function getBrowserStorageItemsCount(storage) {
  return parseInt(getStoredItem(storage, browserCacheCountKey)) || 0;
}

const browserStorageConfig = {
  local: true,
  session: true
};
const browserStorageEmptyItems = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let browserStorageStatus = false;
function setBrowserStorageStatus(status) {
  browserStorageStatus = status;
}

let _window = typeof window === "undefined" ? {} : window;
function getBrowserStorage(key) {
  const attr = key + "Storage";
  try {
    if (_window && _window[attr] && typeof _window[attr].length === "number") {
      return _window[attr];
    }
  } catch (err) {
  }
  browserStorageConfig[key] = false;
}

function iterateBrowserStorage(key, callback) {
  const func = getBrowserStorage(key);
  if (!func) {
    return;
  }
  const version = getStoredItem(func, browserCacheVersionKey);
  if (version !== browserCacheVersion) {
    if (version) {
      const total2 = getBrowserStorageItemsCount(func);
      for (let i = 0; i < total2; i++) {
        removeStoredItem(func, browserCachePrefix + i.toString());
      }
    }
    setStoredItem(func, browserCacheVersionKey, browserCacheVersion);
    setBrowserStorageItemsCount(func, 0);
    return;
  }
  const minTime = Math.floor(Date.now() / browserStorageHour) - browserStorageCacheExpiration;
  const parseItem = (index) => {
    const name = browserCachePrefix + index.toString();
    const item = getStoredItem(func, name);
    if (typeof item !== "string") {
      return;
    }
    try {
      const data = JSON.parse(item);
      if (typeof data === "object" && typeof data.cached === "number" && data.cached > minTime && typeof data.provider === "string" && typeof data.data === "object" && typeof data.data.prefix === "string" && // Valid item: run callback
      callback(data, index)) {
        return true;
      }
    } catch (err) {
    }
    removeStoredItem(func, name);
  };
  let total = getBrowserStorageItemsCount(func);
  for (let i = total - 1; i >= 0; i--) {
    if (!parseItem(i)) {
      if (i === total - 1) {
        total--;
        setBrowserStorageItemsCount(func, total);
      } else {
        browserStorageEmptyItems[key].add(i);
      }
    }
  }
}

function initBrowserStorage() {
  if (browserStorageStatus) {
    return;
  }
  setBrowserStorageStatus(true);
  for (const key in browserStorageConfig) {
    iterateBrowserStorage(key, (item) => {
      const iconSet = item.data;
      const provider = item.provider;
      const prefix = iconSet.prefix;
      const storage = getStorage(
        provider,
        prefix
      );
      if (!addIconSet(storage, iconSet).length) {
        return false;
      }
      const lastModified = iconSet.lastModified || -1;
      storage.lastModifiedCached = storage.lastModifiedCached ? Math.min(storage.lastModifiedCached, lastModified) : lastModified;
      return true;
    });
  }
}

function updateLastModified(storage, lastModified) {
  const lastValue = storage.lastModifiedCached;
  if (
    // Matches or newer
    lastValue && lastValue >= lastModified
  ) {
    return lastValue === lastModified;
  }
  storage.lastModifiedCached = lastModified;
  if (lastValue) {
    for (const key in browserStorageConfig) {
      iterateBrowserStorage(key, (item) => {
        const iconSet = item.data;
        return item.provider !== storage.provider || iconSet.prefix !== storage.prefix || iconSet.lastModified === lastModified;
      });
    }
  }
  return true;
}
function storeInBrowserStorage(storage, data) {
  if (!browserStorageStatus) {
    initBrowserStorage();
  }
  function store(key) {
    let func;
    if (!browserStorageConfig[key] || !(func = getBrowserStorage(key))) {
      return;
    }
    const set = browserStorageEmptyItems[key];
    let index;
    if (set.size) {
      set.delete(index = Array.from(set).shift());
    } else {
      index = getBrowserStorageItemsCount(func);
      if (index >= browserStorageLimit || !setBrowserStorageItemsCount(func, index + 1)) {
        return;
      }
    }
    const item = {
      cached: Math.floor(Date.now() / browserStorageHour),
      provider: storage.provider,
      data
    };
    return setStoredItem(
      func,
      browserCachePrefix + index.toString(),
      JSON.stringify(item)
    );
  }
  if (data.lastModified && !updateLastModified(storage, data.lastModified)) {
    return;
  }
  if (!Object.keys(data.icons).length) {
    return;
  }
  if (data.not_found) {
    data = Object.assign({}, data);
    delete data.not_found;
  }
  if (!store("local")) {
    store("session");
  }
}

function emptyCallback() {
}
function loadedNewIcons(storage) {
  if (!storage.iconsLoaderFlag) {
    storage.iconsLoaderFlag = true;
    setTimeout(() => {
      storage.iconsLoaderFlag = false;
      updateCallbacks(storage);
    });
  }
}
function checkIconNamesForAPI(icons) {
  const valid = [];
  const invalid = [];
  icons.forEach((name) => {
    (name.match(matchIconName) ? valid : invalid).push(name);
  });
  return {
    valid,
    invalid
  };
}
function parseLoaderResponse(storage, icons, data, isAPIResponse) {
  function checkMissing() {
    const pending = storage.pendingIcons;
    icons.forEach((name) => {
      if (pending) {
        pending.delete(name);
      }
      if (!storage.icons[name]) {
        storage.missing.add(name);
      }
    });
  }
  if (data && typeof data === "object") {
    try {
      const parsed = addIconSet(storage, data);
      if (!parsed.length) {
        checkMissing();
        return;
      }
      if (isAPIResponse) {
        storeInBrowserStorage(storage, data);
      }
    } catch (err) {
      console.error(err);
    }
  }
  checkMissing();
  loadedNewIcons(storage);
}
function parsePossiblyAsyncResponse(response, callback) {
  if (response instanceof Promise) {
    response.then((data) => {
      callback(data);
    }).catch(() => {
      callback(null);
    });
  } else {
    callback(response);
  }
}
function loadNewIcons(storage, icons) {
  if (!storage.iconsToLoad) {
    storage.iconsToLoad = icons;
  } else {
    storage.iconsToLoad = storage.iconsToLoad.concat(icons).sort();
  }
  if (!storage.iconsQueueFlag) {
    storage.iconsQueueFlag = true;
    setTimeout(() => {
      storage.iconsQueueFlag = false;
      const { provider, prefix } = storage;
      const icons2 = storage.iconsToLoad;
      delete storage.iconsToLoad;
      if (!icons2 || !icons2.length) {
        return;
      }
      const customIconLoader = storage.loadIcon;
      if (storage.loadIcons && (icons2.length > 1 || !customIconLoader)) {
        parsePossiblyAsyncResponse(
          storage.loadIcons(icons2, prefix, provider),
          (data) => {
            parseLoaderResponse(storage, icons2, data, false);
          }
        );
        return;
      }
      if (customIconLoader) {
        icons2.forEach((name) => {
          const response = customIconLoader(name, prefix, provider);
          parsePossiblyAsyncResponse(response, (data) => {
            const iconSet = data ? {
              prefix,
              icons: {
                [name]: data
              }
            } : null;
            parseLoaderResponse(storage, [name], iconSet, false);
          });
        });
        return;
      }
      const { valid, invalid } = checkIconNamesForAPI(icons2);
      if (invalid.length) {
        parseLoaderResponse(storage, invalid, null, false);
      }
      if (!valid.length) {
        return;
      }
      const api = prefix.match(matchIconName) ? getAPIModule(provider) : null;
      if (!api) {
        parseLoaderResponse(storage, valid, null, false);
        return;
      }
      const params = api.prepare(provider, prefix, valid);
      params.forEach((item) => {
        sendAPIQuery(provider, item, (data) => {
          parseLoaderResponse(storage, item.icons, data, true);
        });
      });
    });
  }
}
const loadIcons$1 = (icons, callback) => {
  const cleanedIcons = listToIcons(icons, true, allowSimpleNames());
  const sortedIcons = sortIcons(cleanedIcons);
  if (!sortedIcons.pending.length) {
    let callCallback = true;
    if (callback) {
      setTimeout(() => {
        if (callCallback) {
          callback(
            sortedIcons.loaded,
            sortedIcons.missing,
            sortedIcons.pending,
            emptyCallback
          );
        }
      });
    }
    return () => {
      callCallback = false;
    };
  }
  const newIcons = /* @__PURE__ */ Object.create(null);
  const sources = [];
  let lastProvider, lastPrefix;
  sortedIcons.pending.forEach((icon) => {
    const { provider, prefix } = icon;
    if (prefix === lastPrefix && provider === lastProvider) {
      return;
    }
    lastProvider = provider;
    lastPrefix = prefix;
    sources.push(getStorage(provider, prefix));
    const providerNewIcons = newIcons[provider] || (newIcons[provider] = /* @__PURE__ */ Object.create(null));
    if (!providerNewIcons[prefix]) {
      providerNewIcons[prefix] = [];
    }
  });
  sortedIcons.pending.forEach((icon) => {
    const { provider, prefix, name } = icon;
    const storage = getStorage(provider, prefix);
    const pendingQueue = storage.pendingIcons || (storage.pendingIcons = /* @__PURE__ */ new Set());
    if (!pendingQueue.has(name)) {
      pendingQueue.add(name);
      newIcons[provider][prefix].push(name);
    }
  });
  sources.forEach((storage) => {
    const list = newIcons[storage.provider][storage.prefix];
    if (list.length) {
      loadNewIcons(storage, list);
    }
  });
  return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
};
const loadIcon$1 = (icon) => {
  return new Promise((fulfill, reject) => {
    const iconObj = typeof icon === "string" ? stringToIcon(icon, true) : icon;
    if (!iconObj) {
      reject(icon);
      return;
    }
    loadIcons$1([iconObj || icon], (loaded) => {
      if (loaded.length && iconObj) {
        const data = getIconData(iconObj);
        if (data) {
          fulfill({
            ...defaultIconProps,
            ...data
          });
          return;
        }
      }
      reject(icon);
    });
  });
};

/**
 * Test icon string
 */
function testIconObject(value) {
    try {
        const obj = typeof value === 'string' ? JSON.parse(value) : value;
        if (typeof obj.body === 'string') {
            return {
                ...obj,
            };
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }
    catch (err) {
        //
    }
}

/**
 * Parse icon value, load if needed
 */
function parseIconValue(value, onload) {
    if (typeof value === 'object') {
        const data = testIconObject(value);
        return {
            data,
            value,
        };
    }
    if (typeof value !== 'string') {
        // Invalid value
        return {
            value,
        };
    }
    // Check for JSON
    if (value.includes('{')) {
        const data = testIconObject(value);
        if (data) {
            return {
                data,
                value,
            };
        }
    }
    // Parse icon name
    const name = stringToIcon(value, true, true);
    if (!name) {
        return {
            value,
        };
    }
    // Valid icon name: check if data is available
    const data = getIconData(name);
    // Icon data exists or icon has no prefix. Do not load icon from API if icon has no prefix
    if (data !== undefined || !name.prefix) {
        return {
            value,
            name,
            data, // could be 'null' -> icon is missing
        };
    }
    // Load icon
    const loading = loadIcons$1([name], () => onload(value, name, getIconData(name)));
    return {
        value,
        name,
        loading,
    };
}

// Check for Safari
let isBuggedSafari = false;
try {
    isBuggedSafari = navigator.vendor.indexOf('Apple') === 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
}
catch (err) {
    //
}
/**
 * Get render mode
 */
function getRenderMode(body, mode) {
    switch (mode) {
        // Force mode
        case 'svg':
        case 'bg':
        case 'mask':
            return mode;
    }
    // Check for animation, use 'style' for animated icons, unless browser is Safari
    // (only <a>, which should be ignored or animations start with '<a')
    if (mode !== 'style' &&
        (isBuggedSafari || body.indexOf('<a') === -1)) {
        // Render <svg>
        return 'svg';
    }
    // Use background or mask
    return body.indexOf('currentColor') === -1 ? 'bg' : 'mask';
}

const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize$1(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision || 100;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}

function splitSVGDefs(content, tag = "defs") {
  let defs = "";
  const index = content.indexOf("<" + tag);
  while (index >= 0) {
    const start = content.indexOf(">", index);
    const end = content.indexOf("</" + tag);
    if (start === -1 || end === -1) {
      break;
    }
    const endEnd = content.indexOf(">", end);
    if (endEnd === -1) {
      break;
    }
    defs += content.slice(start + 1, end).trim();
    content = content.slice(0, index).trim() + content.slice(endEnd + 1);
  }
  return {
    defs,
    content
  };
}
function mergeDefsAndContent(defs, content) {
  return defs ? "<defs>" + defs + "</defs>" + content : content;
}
function wrapSVGContent(body, start, end) {
  const split = splitSVGDefs(body);
  return mergeDefsAndContent(split.defs, start + split.content + end);
}

const isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push(
          "translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")"
        );
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push(
        "translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")"
      );
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift(
          "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
      case 2:
        transformations.unshift(
          "rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")"
        );
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift(
          "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = wrapSVGContent(
        body,
        '<g transform="' + transformations.join(" ") + '">',
        "</g>"
      );
    }
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize$1(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize$1(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword(value)) {
      attributes[prop] = value.toString();
    }
  };
  setAttr("width", width);
  setAttr("height", height);
  const viewBox = [box.left, box.top, boxWidth, boxHeight];
  attributes.viewBox = viewBox.join(" ");
  return {
    attributes,
    viewBox,
    body
  };
}

function iconToHTML$1(body, attributes) {
  let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes) {
    renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
  }
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
}

function encodeSVGforURL(svg) {
  return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function svgToData(svg) {
  return "data:image/svg+xml," + encodeSVGforURL(svg);
}
function svgToURL$1(svg) {
  return 'url("' + svgToData(svg) + '")';
}

const detectFetch = () => {
  let callback;
  try {
    callback = fetch;
    if (typeof callback === "function") {
      return callback;
    }
  } catch (err) {
  }
};
let fetchModule = detectFetch();
function setFetch(fetch2) {
  fetchModule = fetch2;
}
function getFetch() {
  return fetchModule;
}
function calculateMaxLength(provider, prefix) {
  const config = getAPIConfig(provider);
  if (!config) {
    return 0;
  }
  let result;
  if (!config.maxURL) {
    result = 0;
  } else {
    let maxHostLength = 0;
    config.resources.forEach((item) => {
      const host = item;
      maxHostLength = Math.max(maxHostLength, host.length);
    });
    const url = prefix + ".json?icons=";
    result = config.maxURL - maxHostLength - config.path.length - url.length;
  }
  return result;
}
function shouldAbort(status) {
  return status === 404;
}
const prepare = (provider, prefix, icons) => {
  const results = [];
  const maxLength = calculateMaxLength(provider, prefix);
  const type = "icons";
  let item = {
    type,
    provider,
    prefix,
    icons: []
  };
  let length = 0;
  icons.forEach((name, index) => {
    length += name.length + 1;
    if (length >= maxLength && index > 0) {
      results.push(item);
      item = {
        type,
        provider,
        prefix,
        icons: []
      };
      length = name.length;
    }
    item.icons.push(name);
  });
  results.push(item);
  return results;
};
function getPath(provider) {
  if (typeof provider === "string") {
    const config = getAPIConfig(provider);
    if (config) {
      return config.path;
    }
  }
  return "/";
}
const send = (host, params, callback) => {
  if (!fetchModule) {
    callback("abort", 424);
    return;
  }
  let path = getPath(params.provider);
  switch (params.type) {
    case "icons": {
      const prefix = params.prefix;
      const icons = params.icons;
      const iconsList = icons.join(",");
      const urlParams = new URLSearchParams({
        icons: iconsList
      });
      path += prefix + ".json?" + urlParams.toString();
      break;
    }
    case "custom": {
      const uri = params.uri;
      path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
      break;
    }
    default:
      callback("abort", 400);
      return;
  }
  let defaultError = 503;
  fetchModule(host + path).then((response) => {
    const status = response.status;
    if (status !== 200) {
      setTimeout(() => {
        callback(shouldAbort(status) ? "abort" : "next", status);
      });
      return;
    }
    defaultError = 501;
    return response.json();
  }).then((data) => {
    if (typeof data !== "object" || data === null) {
      setTimeout(() => {
        if (data === 404) {
          callback("abort", data);
        } else {
          callback("next", defaultError);
        }
      });
      return;
    }
    setTimeout(() => {
      callback("success", data);
    });
  }).catch(() => {
    callback("next", defaultError);
  });
};
const fetchAPIModule = {
  prepare,
  send
};

function setCustomIconsLoader$1(loader, prefix, provider) {
  getStorage(provider || "", prefix).loadIcons = loader;
}
function setCustomIconLoader$1(loader, prefix, provider) {
  getStorage(provider || "", prefix).loadIcon = loader;
}

function toggleBrowserCache(storage, value) {
  switch (storage) {
    case "local":
    case "session":
      browserStorageConfig[storage] = value;
      break;
    case "all":
      for (const key in browserStorageConfig) {
        browserStorageConfig[key] = value;
      }
      break;
  }
}

/**
 * Attribute to add
 */
const nodeAttr = 'data-style';
/**
 * Custom style to add to each node
 */
let customStyle = '';
/**
 * Set custom style to add to all components
 *
 * Affects only components rendered after function call
 */
function appendCustomStyle(style) {
    customStyle = style;
}
/**
 * Add/update style node
 */
function updateStyle(parent, inline) {
    // Get node, create if needed
    let styleNode = Array.from(parent.childNodes).find((node) => node.hasAttribute &&
        node.hasAttribute(nodeAttr));
    if (!styleNode) {
        styleNode = document.createElement('style');
        styleNode.setAttribute(nodeAttr, nodeAttr);
        parent.appendChild(styleNode);
    }
    // Update content
    styleNode.textContent =
        ':host{display:inline-block;vertical-align:' +
            (inline ? '-0.125em' : '0') +
            '}span,svg{display:block;margin:auto}' +
            customStyle;
}

// Core
/**
 * Get functions and initialise stuff
 */
function exportFunctions() {
    /**
     * Initialise stuff
     */
    // Set API module
    setAPIModule('', fetchAPIModule);
    // Allow simple icon names
    allowSimpleNames(true);
    let _window;
    try {
        _window = window;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }
    catch (err) {
        //
    }
    if (_window) {
        // Set cache and load existing cache
        initBrowserStorage();
        // Load icons from global "IconifyPreload"
        if (_window.IconifyPreload !== void 0) {
            const preload = _window.IconifyPreload;
            const err = 'Invalid IconifyPreload syntax.';
            if (typeof preload === 'object' && preload !== null) {
                (preload instanceof Array ? preload : [preload]).forEach((item) => {
                    try {
                        if (
                        // Check if item is an object and not null/array
                        typeof item !== 'object' ||
                            item === null ||
                            item instanceof Array ||
                            // Check for 'icons' and 'prefix'
                            typeof item.icons !== 'object' ||
                            typeof item.prefix !== 'string' ||
                            // Add icon set
                            !addCollection$1(item)) {
                            console.error(err);
                        }
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    }
                    catch (e) {
                        console.error(err);
                    }
                });
            }
        }
        // Set API from global "IconifyProviders"
        if (_window.IconifyProviders !== void 0) {
            const providers = _window.IconifyProviders;
            if (typeof providers === 'object' && providers !== null) {
                for (const key in providers) {
                    const err = 'IconifyProviders[' + key + '] is invalid.';
                    try {
                        const value = providers[key];
                        if (typeof value !== 'object' ||
                            !value ||
                            value.resources === void 0) {
                            continue;
                        }
                        if (!addAPIProvider$1(key, value)) {
                            console.error(err);
                        }
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    }
                    catch (e) {
                        console.error(err);
                    }
                }
            }
        }
    }
    const _api = {
        getAPIConfig,
        setAPIModule,
        sendAPIQuery,
        setFetch,
        getFetch,
        listAPIProviders,
    };
    return {
        enableCache: (storage) => toggleBrowserCache(storage, true),
        disableCache: (storage) => toggleBrowserCache(storage, false),
        iconLoaded: iconLoaded$1,
        iconExists: iconLoaded$1, // deprecated, kept to avoid breaking changes
        getIcon: getIcon$1,
        listIcons: listIcons$1,
        addIcon: addIcon$1,
        addCollection: addCollection$1,
        calculateSize: calculateSize$1,
        buildIcon: iconToSVG,
        iconToHTML: iconToHTML$1,
        svgToURL: svgToURL$1,
        loadIcons: loadIcons$1,
        loadIcon: loadIcon$1,
        addAPIProvider: addAPIProvider$1,
        setCustomIconLoader: setCustomIconLoader$1,
        setCustomIconsLoader: setCustomIconsLoader$1,
        appendCustomStyle,
        _api,
    };
}

// List of properties to apply
const monotoneProps = {
    'background-color': 'currentColor',
};
const coloredProps = {
    'background-color': 'transparent',
};
// Dynamically add common props to variables above
const propsToAdd = {
    image: 'var(--svg)',
    repeat: 'no-repeat',
    size: '100% 100%',
};
const propsToAddTo = {
    '-webkit-mask': monotoneProps,
    'mask': monotoneProps,
    'background': coloredProps,
};
for (const prefix in propsToAddTo) {
    const list = propsToAddTo[prefix];
    for (const prop in propsToAdd) {
        list[prefix + '-' + prop] = propsToAdd[prop];
    }
}
/**
 * Fix size: add 'px' to numbers
 */
function fixSize(value) {
    return value ? value + (value.match(/^[-0-9.]+$/) ? 'px' : '') : 'inherit';
}
/**
 * Render node as <span>
 */
function renderSPAN(data, icon, useMask) {
    const node = document.createElement('span');
    // Body
    let body = data.body;
    if (body.indexOf('<a') !== -1) {
        // Animated SVG: add something to fix timing bug
        body += '<!-- ' + Date.now() + ' -->';
    }
    // Generate SVG as URL
    const renderAttribs = data.attributes;
    const html = iconToHTML$1(body, {
        ...renderAttribs,
        width: icon.width + '',
        height: icon.height + '',
    });
    const url = svgToURL$1(html);
    // Generate style
    const svgStyle = node.style;
    const styles = {
        '--svg': url,
        'width': fixSize(renderAttribs.width),
        'height': fixSize(renderAttribs.height),
        ...(useMask ? monotoneProps : coloredProps),
    };
    // Apply style
    for (const prop in styles) {
        svgStyle.setProperty(prop, styles[prop]);
    }
    return node;
}

let policy;
function createPolicy() {
  try {
    policy = window.trustedTypes.createPolicy("iconify", {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      createHTML: (s) => s
    });
  } catch (err) {
    policy = null;
  }
}
function cleanUpInnerHTML(html) {
  if (policy === void 0) {
    createPolicy();
  }
  return policy ? policy.createHTML(html) : html;
}

/**
 * Render node as <svg>
 */
function renderSVG(data) {
    const node = document.createElement('span');
    // Add style if needed
    const attr = data.attributes;
    let style = '';
    if (!attr.width) {
        style = 'width: inherit;';
    }
    if (!attr.height) {
        style += 'height: inherit;';
    }
    if (style) {
        attr.style = style;
    }
    // Generate SVG
    const html = iconToHTML$1(data.body, attr);
    node.innerHTML = cleanUpInnerHTML(html);
    return node.firstChild;
}

/**
 * Find icon node
 */
function findIconElement(parent) {
    return Array.from(parent.childNodes).find((node) => {
        const tag = node.tagName &&
            node.tagName.toUpperCase();
        return tag === 'SPAN' || tag === 'SVG';
    });
}
/**
 * Render icon
 */
function renderIcon(parent, state) {
    const iconData = state.icon.data;
    const customisations = state.customisations;
    // Render icon
    const renderData = iconToSVG(iconData, customisations);
    if (customisations.preserveAspectRatio) {
        renderData.attributes['preserveAspectRatio'] =
            customisations.preserveAspectRatio;
    }
    const mode = state.renderedMode;
    let node;
    switch (mode) {
        case 'svg':
            node = renderSVG(renderData);
            break;
        default:
            node = renderSPAN(renderData, {
                ...defaultIconProps,
                ...iconData,
            }, mode === 'mask');
    }
    // Set element
    const oldNode = findIconElement(parent);
    if (oldNode) {
        // Replace old element
        if (node.tagName === 'SPAN' && oldNode.tagName === node.tagName) {
            // Swap style instead of whole node
            oldNode.setAttribute('style', node.getAttribute('style'));
        }
        else {
            parent.replaceChild(node, oldNode);
        }
    }
    else {
        // Add new element
        parent.appendChild(node);
    }
}

/**
 * Set state to PendingState
 */
function setPendingState(icon, inline, lastState) {
    const lastRender = lastState &&
        (lastState.rendered
            ? lastState
            : lastState.lastRender);
    return {
        rendered: false,
        inline,
        icon,
        lastRender,
    };
}

/**
 * Register 'iconify-icon' component, if it does not exist
 */
function defineIconifyIcon(name = 'iconify-icon') {
    // Check for custom elements registry and HTMLElement
    let customElements;
    let ParentClass;
    try {
        customElements = window.customElements;
        ParentClass = window.HTMLElement;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }
    catch (err) {
        return;
    }
    // Make sure registry and HTMLElement exist
    if (!customElements || !ParentClass) {
        return;
    }
    // Check for duplicate
    const ConflictingClass = customElements.get(name);
    if (ConflictingClass) {
        return ConflictingClass;
    }
    // All attributes
    const attributes = [
        // Icon
        'icon',
        // Mode
        'mode',
        'inline',
        'noobserver',
        // Customisations
        'width',
        'height',
        'rotate',
        'flip',
    ];
    /**
     * Component class
     */
    const IconifyIcon = class extends ParentClass {
        // Root
        _shadowRoot;
        // Initialised
        _initialised = false;
        // Icon state
        _state;
        // Attributes check queued
        _checkQueued = false;
        // Connected
        _connected = false;
        // Observer
        _observer = null;
        _visible = true;
        /**
         * Constructor
         */
        constructor() {
            super();
            // Attach shadow DOM
            const root = (this._shadowRoot = this.attachShadow({
                mode: 'open',
            }));
            // Add style
            const inline = this.hasAttribute('inline');
            updateStyle(root, inline);
            // Create empty state
            this._state = setPendingState({
                value: '',
            }, inline);
            // Queue icon render
            this._queueCheck();
        }
        /**
         * Connected to DOM
         */
        connectedCallback() {
            this._connected = true;
            this.startObserver();
        }
        /**
         * Disconnected from DOM
         */
        disconnectedCallback() {
            this._connected = false;
            this.stopObserver();
        }
        /**
         * Observed attributes
         */
        static get observedAttributes() {
            return attributes.slice(0);
        }
        /**
         * Observed properties that are different from attributes
         *
         * Experimental! Need to test with various frameworks that support it
         */
        /*
        static get properties() {
            return {
                inline: {
                    type: Boolean,
                    reflect: true,
                },
                // Not listing other attributes because they are strings or combination
                // of string and another type. Cannot have multiple types
            };
        }
        */
        /**
         * Attribute has changed
         */
        attributeChangedCallback(name) {
            switch (name) {
                case 'inline': {
                    // Update immediately: not affected by other attributes
                    const newInline = this.hasAttribute('inline');
                    const state = this._state;
                    if (newInline !== state.inline) {
                        // Update style if inline mode changed
                        state.inline = newInline;
                        updateStyle(this._shadowRoot, newInline);
                    }
                    break;
                }
                case 'noobserver': {
                    const value = this.hasAttribute('noobserver');
                    if (value) {
                        this.startObserver();
                    }
                    else {
                        this.stopObserver();
                    }
                    break;
                }
                default:
                    // Queue check for other attributes
                    this._queueCheck();
            }
        }
        /**
         * Get/set icon
         */
        get icon() {
            const value = this.getAttribute('icon');
            if (value && value.slice(0, 1) === '{') {
                try {
                    return JSON.parse(value);
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                }
                catch (err) {
                    //
                }
            }
            return value;
        }
        set icon(value) {
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }
            this.setAttribute('icon', value);
        }
        /**
         * Get/set inline
         */
        get inline() {
            return this.hasAttribute('inline');
        }
        set inline(value) {
            if (value) {
                this.setAttribute('inline', 'true');
            }
            else {
                this.removeAttribute('inline');
            }
        }
        /**
         * Get/set observer
         */
        get observer() {
            return this.hasAttribute('observer');
        }
        set observer(value) {
            if (value) {
                this.setAttribute('observer', 'true');
            }
            else {
                this.removeAttribute('observer');
            }
        }
        /**
         * Restart animation
         */
        restartAnimation() {
            const state = this._state;
            if (state.rendered) {
                const root = this._shadowRoot;
                if (state.renderedMode === 'svg') {
                    // Update root node
                    try {
                        root.lastChild.setCurrentTime(0);
                        return;
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    }
                    catch (err) {
                        // Failed: setCurrentTime() is not supported
                    }
                }
                renderIcon(root, state);
            }
        }
        /**
         * Get status
         */
        get status() {
            const state = this._state;
            return state.rendered
                ? 'rendered'
                : state.icon.data === null
                    ? 'failed'
                    : 'loading';
        }
        /**
         * Queue attributes re-check
         */
        _queueCheck() {
            if (!this._checkQueued) {
                this._checkQueued = true;
                setTimeout(() => {
                    this._check();
                });
            }
        }
        /**
         * Check for changes
         */
        _check() {
            if (!this._checkQueued) {
                return;
            }
            this._checkQueued = false;
            const state = this._state;
            // Get icon
            const newIcon = this.getAttribute('icon');
            if (newIcon !== state.icon.value) {
                this._iconChanged(newIcon);
                return;
            }
            // Ignore other attributes if icon is not rendered
            if (!state.rendered || !this._visible) {
                return;
            }
            // Check for mode and attribute changes
            const mode = this.getAttribute('mode');
            const customisations = getCustomisations(this);
            if (state.attrMode !== mode ||
                haveCustomisationsChanged(state.customisations, customisations) ||
                !findIconElement(this._shadowRoot)) {
                this._renderIcon(state.icon, customisations, mode);
            }
        }
        /**
         * Icon value has changed
         */
        _iconChanged(newValue) {
            const icon = parseIconValue(newValue, (value, name, data) => {
                // Asynchronous callback: re-check values to make sure stuff wasn't changed
                const state = this._state;
                if (state.rendered || this.getAttribute('icon') !== value) {
                    // Icon data is already available or icon attribute was changed
                    return;
                }
                // Change icon
                const icon = {
                    value,
                    name,
                    data,
                };
                if (icon.data) {
                    // Render icon
                    this._gotIconData(icon);
                }
                else {
                    // Nothing to render: update icon in state
                    state.icon = icon;
                }
            });
            if (icon.data) {
                // Icon is ready to render
                this._gotIconData(icon);
            }
            else {
                // Pending icon
                this._state = setPendingState(icon, this._state.inline, this._state);
            }
        }
        /**
         * Force render icon on state change
         */
        _forceRender() {
            if (!this._visible) {
                // Remove icon
                const node = findIconElement(this._shadowRoot);
                if (node) {
                    this._shadowRoot.removeChild(node);
                }
                return;
            }
            // Re-render icon
            this._queueCheck();
        }
        /**
         * Got new icon data, icon is ready to (re)render
         */
        _gotIconData(icon) {
            this._checkQueued = false;
            this._renderIcon(icon, getCustomisations(this), this.getAttribute('mode'));
        }
        /**
         * Re-render based on icon data
         */
        _renderIcon(icon, customisations, attrMode) {
            // Get mode
            const renderedMode = getRenderMode(icon.data.body, attrMode);
            // Inline was not changed
            const inline = this._state.inline;
            // Set state and render
            renderIcon(this._shadowRoot, (this._state = {
                rendered: true,
                icon,
                inline,
                customisations,
                attrMode,
                renderedMode,
            }));
        }
        /**
         * Start observer
         */
        startObserver() {
            if (!this._observer && !this.hasAttribute('noobserver')) {
                try {
                    this._observer = new IntersectionObserver((entries) => {
                        const intersecting = entries.some((entry) => entry.isIntersecting);
                        if (intersecting !== this._visible) {
                            this._visible = intersecting;
                            this._forceRender();
                        }
                    });
                    this._observer.observe(this);
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                }
                catch (err) {
                    // Something went wrong, possibly observer is not supported
                    if (this._observer) {
                        try {
                            this._observer.disconnect();
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        }
                        catch (err) {
                            //
                        }
                        this._observer = null;
                    }
                }
            }
        }
        /**
         * Stop observer
         */
        stopObserver() {
            if (this._observer) {
                this._observer.disconnect();
                this._observer = null;
                this._visible = true;
                if (this._connected) {
                    // Render icon
                    this._forceRender();
                }
            }
        }
    };
    // Add getters and setters
    attributes.forEach((attr) => {
        if (!(attr in IconifyIcon.prototype)) {
            Object.defineProperty(IconifyIcon.prototype, attr, {
                get: function () {
                    return this.getAttribute(attr);
                },
                set: function (value) {
                    if (value !== null) {
                        this.setAttribute(attr, value);
                    }
                    else {
                        this.removeAttribute(attr);
                    }
                },
            });
        }
    });
    // Add exported functions: both as static and instance methods
    const functions = exportFunctions();
    for (const key in functions) {
        IconifyIcon[key] = IconifyIcon.prototype[key] = functions[key];
    }
    // Define new component
    customElements.define(name, IconifyIcon);
    return IconifyIcon;
}

/**
 * Create exported data: either component instance or functions
 */
const IconifyIconComponent = defineIconifyIcon() || exportFunctions();
/**
 * Export functions
 */
const { enableCache, disableCache, iconLoaded, iconExists, // deprecated, kept to avoid breaking changes
getIcon, listIcons, addIcon, addCollection, calculateSize, buildIcon, iconToHTML, svgToURL, loadIcons, loadIcon, setCustomIconLoader, setCustomIconsLoader, addAPIProvider, _api, } = IconifyIconComponent;

var _shared = {
  pullStartY: null,
  pullMoveY: null,
  handlers: [],
  styleEl: null,
  events: null,
  dist: 0,
  state: 'pending',
  timeout: null,
  distResisted: 0,
  supportsPassive: false,
  supportsPointerEvents: typeof window !== 'undefined' && !!window.PointerEvent
};

try {
  window.addEventListener('test', null, {
    get passive() {
      // eslint-disable-line getter-return
      _shared.supportsPassive = true;
    }

  });
} catch (e) {// do nothing
}

// src/lib/icons/index.ts
addCollection({
	prefix: "ion",
	icons: /* @__PURE__ */ JSON.parse("{\"add\":{\"body\":\"<path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"32\\\" d=\\\"M256 112v288m144-144H112\\\"/>\"},\"albums\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M368 96H144a16 16 0 0 1 0-32h224a16 16 0 0 1 0 32m32 48H112a16 16 0 0 1 0-32h288a16 16 0 0 1 0 32m19.13 304H92.87A44.92 44.92 0 0 1 48 403.13V204.87A44.92 44.92 0 0 1 92.87 160h326.26A44.92 44.92 0 0 1 464 204.87v198.26A44.92 44.92 0 0 1 419.13 448\\\"/>\"},\"alert-circle\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48m0 319.91a20 20 0 1 1 20-20a20 20 0 0 1-20 20m21.72-201.15l-5.74 122a16 16 0 0 1-32 0l-5.74-121.94v-.05a21.74 21.74 0 1 1 43.44 0Z\\\"/>\"},\"arrow-back\":{\"body\":\"<path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"48\\\" d=\\\"M244 400L100 256l144-144M120 256h292\\\"/>\"},\"arrow-down\":{\"body\":\"<path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"48\\\" d=\\\"m112 268l144 144l144-144M256 392V100\\\"/>\"},\"arrow-forward\":{\"body\":\"<path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"48\\\" d=\\\"m268 112l144 144l-144 144m124-144H100\\\"/>\"},\"arrow-up\":{\"body\":\"<path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"48\\\" d=\\\"m112 244l144-144l144 144M256 120v292\\\"/>\"},\"bag\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M454.65 169.4A31.82 31.82 0 0 0 432 160h-64v-16a112 112 0 0 0-224 0v16H80a32 32 0 0 0-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0 0 50.48-20.55a69.48 69.48 0 0 0 21.52-50.2V192a31.75 31.75 0 0 0-9.35-22.6M176 144a80 80 0 0 1 160 0v16H176Z\\\"/>\"},\"bag-check\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M454.65 169.4A31.82 31.82 0 0 0 432 160h-64v-16a112 112 0 0 0-224 0v16H80a32 32 0 0 0-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0 0 50.48-20.55a69.48 69.48 0 0 0 21.52-50.2V192a31.75 31.75 0 0 0-9.35-22.6M332.49 274l-89.6 112a16 16 0 0 1-12.23 6h-.26a16 16 0 0 1-12.16-5.6l-38.4-44.88a16 16 0 1 1 24.32-20.8L230 350.91L307.51 254a16 16 0 0 1 25 20ZM336 160H176v-16a80 80 0 0 1 160 0Z\\\"/>\"},\"build\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M469.54 120.52a16 16 0 0 0-25.54-4L382.56 178a16.12 16.12 0 0 1-22.63 0l-26.56-26.6a16 16 0 0 1 0-22.63l61.18-61.19a16 16 0 0 0-4.78-25.92C343.56 21 285.88 31.78 249.51 67.88c-30.9 30.68-40.11 78.62-25.25 131.53a15.89 15.89 0 0 1-4.49 16L53.29 367.46a64.17 64.17 0 1 0 90.6 90.64l153.68-166.85a15.9 15.9 0 0 1 15.77-4.57a179.3 179.3 0 0 0 46.22 6.37c33.4 0 62.71-10.81 83.85-31.64c39.15-38.57 45.12-103.99 26.13-140.89M99.48 447.15a32 32 0 1 1 28.34-28.35a32 32 0 0 1-28.34 28.35\\\"/>\"},\"caret-down\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"m98 190.06l139.78 163.12a24 24 0 0 0 36.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62\\\"/>\"},\"checkmark\":{\"body\":\"<path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"32\\\" d=\\\"M416 128L192 384l-96-96\\\"/>\"},\"checkmark-circle-outline\":{\"body\":\"<path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-miterlimit=\\\"10\\\" stroke-width=\\\"32\\\" d=\\\"M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z\\\"/><path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"32\\\" d=\\\"M352 176L217.6 336L160 272\\\"/>\"},\"chevron-down\":{\"body\":\"<path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"48\\\" d=\\\"m112 184l144 144l144-144\\\"/>\"},\"chevron-up\":{\"body\":\"<path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"48\\\" d=\\\"m112 328l144-144l144 144\\\"/>\"},\"close\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"m289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34Z\\\"/>\"},\"close-circle\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48m75.31 260.69a16 16 0 1 1-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 0 1-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0 1 22.62-22.62L256 233.37l52.69-52.68a16 16 0 0 1 22.62 22.62L278.63 256Z\\\"/>\"},\"copy\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M408 480H184a72 72 0 0 1-72-72V184a72 72 0 0 1 72-72h224a72 72 0 0 1 72 72v224a72 72 0 0 1-72 72\\\"/><path fill=\\\"currentColor\\\" d=\\\"M160 80h235.88A72.12 72.12 0 0 0 328 32H104a72 72 0 0 0-72 72v224a72.12 72.12 0 0 0 48 67.88V160a80 80 0 0 1 80-80\\\"/>\"},\"create-outline\":{\"body\":\"<path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"32\\\" d=\\\"M384 224v184a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V168a40 40 0 0 1 40-40h167.48\\\"/><path fill=\\\"currentColor\\\" d=\\\"M459.94 53.25a16.06 16.06 0 0 0-23.22-.56L424.35 65a8 8 0 0 0 0 11.31l11.34 11.32a8 8 0 0 0 11.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38M399.34 90L218.82 270.2a9 9 0 0 0-2.31 3.93L208.16 299a3.91 3.91 0 0 0 4.86 4.86l24.85-8.35a9 9 0 0 0 3.93-2.31L422 112.66a9 9 0 0 0 0-12.66l-9.95-10a9 9 0 0 0-12.71 0\\\"/>\"},\"edit\":{\"body\":\"<path d=\\\"M163 439.573l-90.569-90.569L322.78 98.656l90.57 90.569z\\\" fill=\\\"currentColor\\\"/><path d=\\\"M471.723 88.393l-48.115-48.114c-11.723-11.724-31.558-10.896-44.304 1.85l-45.202 45.203 90.569 90.568 45.202-45.202c12.743-12.746 13.572-32.582 1.85-44.305z\\\" fill=\\\"currentColor\\\"/><path d=\\\"M64.021 363.252L32 480l116.737-32.021z\\\" fill=\\\"currentColor\\\"/>\",\"hidden\":true},\"ellipse-sharp\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M256 464c-114.69 0-208-93.31-208-208S141.31 48 256 48s208 93.31 208 208s-93.31 208-208 208\\\"/>\"},\"eye\":{\"body\":\"<circle cx=\\\"256\\\" cy=\\\"256\\\" r=\\\"64\\\" fill=\\\"currentColor\\\"/><path fill=\\\"currentColor\\\" d=\\\"M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96c-42.52 0-84.33 12.15-124.27 36.11c-40.73 24.43-77.63 60.12-109.68 106.07a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416c46.71 0 93.81-14.43 136.2-41.72c38.46-24.77 72.72-59.66 99.08-100.92a32.2 32.2 0 0 0-.1-34.76M256 352a96 96 0 1 1 96-96a96.11 96.11 0 0 1-96 96\\\"/>\"},\"eye-off\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448M248 315.85l-51.79-51.79a2 2 0 0 0-3.39 1.69a64.11 64.11 0 0 0 53.49 53.49a2 2 0 0 0 1.69-3.39m16-119.7L315.87 248a2 2 0 0 0 3.4-1.69a64.13 64.13 0 0 0-53.55-53.55a2 2 0 0 0-1.72 3.39\\\"/><path fill=\\\"currentColor\\\" d=\\\"M491 273.36a32.2 32.2 0 0 0-.1-34.76c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.68 96a226.5 226.5 0 0 0-71.82 11.79a4 4 0 0 0-1.56 6.63l47.24 47.24a4 4 0 0 0 3.82 1.05a96 96 0 0 1 116 116a4 4 0 0 0 1.05 3.81l67.95 68a4 4 0 0 0 5.4.24a343.8 343.8 0 0 0 67.24-77.4M256 352a96 96 0 0 1-93.3-118.63a4 4 0 0 0-1.05-3.81l-66.84-66.87a4 4 0 0 0-5.41-.23c-24.39 20.81-47 46.13-67.67 75.72a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.39 76.14 98.28 100.65C162.06 402 207.92 416 255.68 416a238.2 238.2 0 0 0 72.64-11.55a4 4 0 0 0 1.61-6.64l-47.47-47.46a4 4 0 0 0-3.81-1.05A96 96 0 0 1 256 352\\\"/>\"},\"filter\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M472 168H40a24 24 0 0 1 0-48h432a24 24 0 0 1 0 48m-80 112H120a24 24 0 0 1 0-48h272a24 24 0 0 1 0 48m-96 112h-80a24 24 0 0 1 0-48h80a24 24 0 0 1 0 48\\\"/>\"},\"gift\":{\"body\":\"<path fill=\\\"none\\\" d=\\\"M200 144h40v-40a40 40 0 1 0-40 40m152-40a40 40 0 0 0-80 0v40h40a40 40 0 0 0 40-40\\\"/><path fill=\\\"currentColor\\\" d=\\\"M80 416a64 64 0 0 0 64 64h92a4 4 0 0 0 4-4V292a4 4 0 0 0-4-4H88a8 8 0 0 0-8 8Zm160-164V144h32v108a4 4 0 0 0 4 4h140a47.9 47.9 0 0 0 16-2.75A48.09 48.09 0 0 0 464 208v-16a48 48 0 0 0-48-48h-40.54a2 2 0 0 1-1.7-3A72 72 0 0 0 256 58.82A72 72 0 0 0 138.24 141a2 2 0 0 1-1.7 3H96a48 48 0 0 0-48 48v16a48.09 48.09 0 0 0 32 45.25A47.9 47.9 0 0 0 96 256h140a4 4 0 0 0 4-4m32-148a40 40 0 1 1 40 40h-40Zm-74.86-39.9A40 40 0 0 1 240 104v40h-40a40 40 0 0 1-2.86-79.89ZM276 480h92a64 64 0 0 0 64-64V296a8 8 0 0 0-8-8H276a4 4 0 0 0-4 4v184a4 4 0 0 0 4 4\\\"/>\"},\"grid\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M204 240H68a36 36 0 0 1-36-36V68a36 36 0 0 1 36-36h136a36 36 0 0 1 36 36v136a36 36 0 0 1-36 36m240 0H308a36 36 0 0 1-36-36V68a36 36 0 0 1 36-36h136a36 36 0 0 1 36 36v136a36 36 0 0 1-36 36M204 480H68a36 36 0 0 1-36-36V308a36 36 0 0 1 36-36h136a36 36 0 0 1 36 36v136a36 36 0 0 1-36 36m240 0H308a36 36 0 0 1-36-36V308a36 36 0 0 1 36-36h136a36 36 0 0 1 36 36v136a36 36 0 0 1-36 36\\\"/>\"},\"help-circle\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M256 64C150 64 64 150 64 256s86 192 192 192s192-86 192-192S362 64 256 64m-6 304a20 20 0 1 1 20-20a20 20 0 0 1-20 20m33.44-102C267.23 276.88 265 286.85 265 296a14 14 0 0 1-28 0c0-21.91 10.08-39.33 30.82-53.26C287.1 229.8 298 221.6 298 203.57c0-12.26-7-21.57-21.49-28.46c-3.41-1.62-11-3.2-20.34-3.09c-11.72.15-20.82 2.95-27.83 8.59C215.12 191.25 214 202.83 214 203a14 14 0 1 1-28-1.35c.11-2.43 1.8-24.32 24.77-42.8c11.91-9.58 27.06-14.56 45-14.78c12.7-.15 24.63 2 32.72 5.82C312.7 161.34 326 180.43 326 203.57c0 33.83-22.61 49.02-42.56 62.43\\\"/>\"},\"help-circle-outline\":{\"body\":\"<path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-miterlimit=\\\"10\\\" stroke-width=\\\"32\\\" d=\\\"M256 80a176 176 0 1 0 176 176A176 176 0 0 0 256 80Z\\\"/><path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-miterlimit=\\\"10\\\" stroke-width=\\\"28\\\" d=\\\"M200 202.29s.84-17.5 19.57-32.57C230.68 160.77 244 158.18 256 158c10.93-.14 20.69 1.67 26.53 4.45c10 4.76 29.47 16.38 29.47 41.09c0 26-17 37.81-36.37 50.8S251 281.43 251 296\\\"/><circle cx=\\\"250\\\" cy=\\\"348\\\" r=\\\"20\\\" fill=\\\"currentColor\\\"/>\"},\"id-card\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M368 16H144a64.07 64.07 0 0 0-64 64v352a64.07 64.07 0 0 0 64 64h224a64.07 64.07 0 0 0 64-64V80a64.07 64.07 0 0 0-64-64m-34.52 268.51c7.57 8.17 11.27 19.16 10.39 30.94C342.14 338.91 324.25 358 304 358s-38.17-19.09-39.88-42.55c-.86-11.9 2.81-22.91 10.34-31S292.4 272 304 272a39.65 39.65 0 0 1 29.48 12.51M192 80a16 16 0 0 1 16-16h96a16 16 0 0 1 0 32h-96a16 16 0 0 1-16-16m189 363.83a12.05 12.05 0 0 1-9.31 4.17H236.31a12.05 12.05 0 0 1-9.31-4.17a13 13 0 0 1-2.76-10.92c3.25-17.56 13.38-32.31 29.3-42.66C267.68 381.06 285.6 376 304 376s36.32 5.06 50.46 14.25c15.92 10.35 26.05 25.1 29.3 42.66a13 13 0 0 1-2.76 10.92\\\"/>\"},\"image\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M416 64H96a64.07 64.07 0 0 0-64 64v256a64.07 64.07 0 0 0 64 64h320a64.07 64.07 0 0 0 64-64V128a64.07 64.07 0 0 0-64-64m-80 64a48 48 0 1 1-48 48a48.05 48.05 0 0 1 48-48M96 416a32 32 0 0 1-32-32v-67.63l94.84-84.3a48.06 48.06 0 0 1 65.8 1.9l64.95 64.81L172.37 416Zm352-32a32 32 0 0 1-32 32H217.63l121.42-121.42a47.72 47.72 0 0 1 61.64-.16L448 333.84Z\\\"/>\"},\"information-circle\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200s200-89.72 200-200S366.28 56 256 56m0 82a26 26 0 1 1-26 26a26 26 0 0 1 26-26m48 226h-88a16 16 0 0 1 0-32h28v-88h-16a16 16 0 0 1 0-32h32a16 16 0 0 1 16 16v104h28a16 16 0 0 1 0 32\\\"/>\"},\"information-circle-outline\":{\"body\":\"<path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-miterlimit=\\\"10\\\" stroke-width=\\\"32\\\" d=\\\"M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184s184-82.39 184-184S349.61 64 248 64Z\\\"/><path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"32\\\" d=\\\"M220 220h32v116\\\"/><path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-miterlimit=\\\"10\\\" stroke-width=\\\"32\\\" d=\\\"M208 340h88\\\"/><path fill=\\\"currentColor\\\" d=\\\"M248 130a26 26 0 1 0 26 26a26 26 0 0 0-26-26\\\"/>\"},\"link\":{\"body\":\"<path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"48\\\" d=\\\"M200.66 352H144a96 96 0 0 1 0-192h55.41m113.18 0H368a96 96 0 0 1 0 192h-56.66m-142.27-96h175.86\\\"/>\"},\"list\":{\"body\":\"<path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"48\\\" d=\\\"M160 144h288M160 256h288M160 368h288\\\"/><circle cx=\\\"80\\\" cy=\\\"144\\\" r=\\\"16\\\" fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"32\\\"/><circle cx=\\\"80\\\" cy=\\\"256\\\" r=\\\"16\\\" fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"32\\\"/><circle cx=\\\"80\\\" cy=\\\"368\\\" r=\\\"16\\\" fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"32\\\"/>\"},\"log-out\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M160 256a16 16 0 0 1 16-16h144V136c0-32-33.79-56-64-56H104a56.06 56.06 0 0 0-56 56v240a56.06 56.06 0 0 0 56 56h160a56.06 56.06 0 0 0 56-56V272H176a16 16 0 0 1-16-16m299.31-11.31l-80-80a16 16 0 0 0-22.62 22.62L409.37 240H320v32h89.37l-52.68 52.69a16 16 0 1 0 22.62 22.62l80-80a16 16 0 0 0 0-22.62\\\"/>\"},\"logo-markdown\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M475 64H37C16.58 64 0 81.38 0 102.77v306.42C0 430.59 16.58 448 37 448h438c20.38 0 37-17.41 37-38.81V102.77C512 81.38 495.42 64 475 64M288 368h-64V256l-48 64l-48-64v112H64V144h64l48 80l48-80h64Zm96 0l-80-112h48.05L352 144h64v112h48Z\\\"/>\"},\"people\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M336 256c-20.56 0-40.44-9.18-56-25.84c-15.13-16.25-24.37-37.92-26-61c-1.74-24.62 5.77-47.26 21.14-63.76S312 80 336 80c23.83 0 45.38 9.06 60.7 25.52c15.47 16.62 23 39.22 21.26 63.63c-1.67 23.11-10.9 44.77-26 61C376.44 246.82 356.57 256 336 256m131.83 176H204.18a27.71 27.71 0 0 1-22-10.67a30.22 30.22 0 0 1-5.26-25.79c8.42-33.81 29.28-61.85 60.32-81.08C264.79 297.4 299.86 288 336 288c36.85 0 71 9 98.71 26.05c31.11 19.13 52 47.33 60.38 81.55a30.27 30.27 0 0 1-5.32 25.78A27.68 27.68 0 0 1 467.83 432M147 260c-35.19 0-66.13-32.72-69-72.93c-1.42-20.6 5-39.65 18-53.62c12.86-13.83 31-21.45 51-21.45s38 7.66 50.93 21.57c13.1 14.08 19.5 33.09 18 53.52c-2.87 40.2-33.8 72.91-68.93 72.91m65.66 31.45c-17.59-8.6-40.42-12.9-65.65-12.9c-29.46 0-58.07 7.68-80.57 21.62c-25.51 15.83-42.67 38.88-49.6 66.71a27.39 27.39 0 0 0 4.79 23.36A25.32 25.32 0 0 0 41.72 400h111a8 8 0 0 0 7.87-6.57c.11-.63.25-1.26.41-1.88c8.48-34.06 28.35-62.84 57.71-83.82a8 8 0 0 0-.63-13.39c-1.57-.92-3.37-1.89-5.42-2.89\\\"/>\"},\"person\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M332.64 64.58C313.18 43.57 286 32 256 32c-30.16 0-57.43 11.5-76.8 32.38c-19.58 21.11-29.12 49.8-26.88 80.78C156.76 206.28 203.27 256 256 256s99.16-49.71 103.67-110.82c2.27-30.7-7.33-59.33-27.03-80.6M432 480H80a31 31 0 0 1-24.2-11.13c-6.5-7.77-9.12-18.38-7.18-29.11C57.06 392.94 83.4 353.61 124.8 326c36.78-24.51 83.37-38 131.2-38s94.42 13.5 131.2 38c41.4 27.6 67.74 66.93 76.18 113.75c1.94 10.73-.68 21.34-7.18 29.11A31 31 0 0 1 432 480\\\"/>\"},\"person-add\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M288 256c52.79 0 99.43-49.71 104-110.82c2.27-30.7-7.36-59.33-27.12-80.6C345.33 43.57 318 32 288 32c-30.24 0-57.59 11.5-77 32.38c-19.63 21.11-29.2 49.8-27 80.78C188.49 206.28 235.12 256 288 256m207.38 183.76c-8.44-46.82-34.79-86.15-76.19-113.75C382.42 301.5 335.83 288 288 288s-94.42 13.5-131.19 38c-41.4 27.6-67.75 66.93-76.19 113.75c-1.93 10.73.69 21.34 7.19 29.11A30.94 30.94 0 0 0 112 480h352a30.94 30.94 0 0 0 24.21-11.13c6.48-7.77 9.1-18.38 7.17-29.11M104 288v-40h40a16 16 0 0 0 0-32h-40v-40a16 16 0 0 0-32 0v40H32a16 16 0 0 0 0 32h40v40a16 16 0 0 0 32 0\\\"/>\"},\"person-remove\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M288 256c52.79 0 99.43-49.71 104-110.82c2.27-30.7-7.36-59.33-27.12-80.6C345.33 43.57 318 32 288 32c-30.24 0-57.59 11.5-77 32.38c-19.63 21.11-29.2 49.8-27 80.78C188.49 206.28 235.12 256 288 256m207.38 183.76c-8.44-46.82-34.79-86.15-76.19-113.75C382.42 301.5 335.83 288 288 288s-94.42 13.5-131.19 38c-41.4 27.6-67.75 66.93-76.19 113.75c-1.93 10.73.69 21.34 7.19 29.11A30.94 30.94 0 0 0 112 480h352a30.94 30.94 0 0 0 24.21-11.13c6.48-7.77 9.1-18.38 7.17-29.11M144 216H32a16 16 0 0 0 0 32h112a16 16 0 0 0 0-32\\\"/>\"},\"pricetag\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M467 45.2A44.45 44.45 0 0 0 435.29 32H312.36a30.63 30.63 0 0 0-21.52 8.89L45.09 286.59a44.82 44.82 0 0 0 0 63.32l117 117a44.83 44.83 0 0 0 63.34 0l245.65-245.6A30.6 30.6 0 0 0 480 199.8v-123a44.24 44.24 0 0 0-13-31.6M384 160a32 32 0 1 1 32-32a32 32 0 0 1-32 32\\\"/>\"},\"reader\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M368 32H144a64.07 64.07 0 0 0-64 64v320a64.07 64.07 0 0 0 64 64h224a64.07 64.07 0 0 0 64-64V96a64.07 64.07 0 0 0-64-64M256 304h-80a16 16 0 0 1 0-32h80a16 16 0 0 1 0 32m80-80H176a16 16 0 0 1 0-32h160a16 16 0 0 1 0 32m0-80H176a16 16 0 0 1 0-32h160a16 16 0 0 1 0 32\\\"/>\"},\"refresh\":{\"body\":\"<path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-miterlimit=\\\"10\\\" stroke-width=\\\"32\\\" d=\\\"M320 146s24.36-12-64-12a160 160 0 1 0 160 160\\\"/><path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"32\\\" d=\\\"m256 58l80 80l-80 80\\\"/>\"},\"reorder-four\":{\"body\":\"<path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"44\\\" d=\\\"M102 304h308m-308-96h308m-308-96h308M102 400h308\\\"/>\"},\"reorder-two\":{\"body\":\"<path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"44\\\" d=\\\"M118 304h276m-276-96h276\\\"/>\"},\"save\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"m465.94 119.76l-73.7-73.7A47.68 47.68 0 0 0 358.3 32H96a64 64 0 0 0-64 64v320a64 64 0 0 0 64 64h320a64 64 0 0 0 64-64V153.7a47.68 47.68 0 0 0-14.06-33.94M120 112h176a8 8 0 0 1 8 8v48a8 8 0 0 1-8 8H120a8 8 0 0 1-8-8v-48a8 8 0 0 1 8-8m139.75 319.91a80 80 0 1 1 76.16-76.16a80.06 80.06 0 0 1-76.16 76.16\\\"/><circle cx=\\\"256\\\" cy=\\\"352\\\" r=\\\"48\\\" fill=\\\"currentColor\\\"/>\"},\"scale\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M368 32H144A112.12 112.12 0 0 0 32 144v224a112.12 112.12 0 0 0 112 112h224a112.12 112.12 0 0 0 112-112V144A112.12 112.12 0 0 0 368 32m36.21 178l-33.32 39.21A41.76 41.76 0 0 1 339 264.05a42.3 42.3 0 0 1-22.29-6.38c-14.22-8.78-36.3-19.25-60.69-19.25s-46.47 10.47-60.69 19.25a41.86 41.86 0 0 1-54.2-8.46L107.79 210a50.48 50.48 0 0 1 4.49-70.27c27.84-25.35 75.37-55.57 143.72-55.57s115.88 30.22 143.72 55.57a50.48 50.48 0 0 1 4.49 70.27\\\"/>\"},\"search\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M456.69 421.39L362.6 327.3a173.8 173.8 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.8 173.8 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3M97.92 222.72a124.8 124.8 0 1 1 124.8 124.8a124.95 124.95 0 0 1-124.8-124.8\\\"/>\"},\"settings\":{\"body\":\"<circle cx=\\\"256\\\" cy=\\\"256\\\" r=\\\"48\\\" fill=\\\"currentColor\\\"/><path fill=\\\"currentColor\\\" d=\\\"m470.39 300l-.47-.38l-31.56-24.75a16.11 16.11 0 0 1-6.1-13.33v-11.56a16 16 0 0 1 6.11-13.22L469.92 212l.47-.38a26.68 26.68 0 0 0 5.9-34.06l-42.71-73.9a1.6 1.6 0 0 1-.13-.22A26.86 26.86 0 0 0 401 92.14l-.35.13l-37.1 14.93a15.94 15.94 0 0 1-14.47-1.29q-4.92-3.1-10-5.86a15.94 15.94 0 0 1-8.19-11.82l-5.59-39.59l-.12-.72A27.22 27.22 0 0 0 298.76 26h-85.52a26.92 26.92 0 0 0-26.45 22.39l-.09.56l-5.57 39.67a16 16 0 0 1-8.13 11.82a175 175 0 0 0-10 5.82a15.92 15.92 0 0 1-14.43 1.27l-37.13-15l-.35-.14a26.87 26.87 0 0 0-32.48 11.34l-.13.22l-42.77 73.95a26.71 26.71 0 0 0 5.9 34.1l.47.38l31.56 24.75a16.11 16.11 0 0 1 6.1 13.33v11.56a16 16 0 0 1-6.11 13.22L42.08 300l-.47.38a26.68 26.68 0 0 0-5.9 34.06l42.71 73.9a1.6 1.6 0 0 1 .13.22a26.86 26.86 0 0 0 32.45 11.3l.35-.13l37.07-14.93a15.94 15.94 0 0 1 14.47 1.29q4.92 3.11 10 5.86a15.94 15.94 0 0 1 8.19 11.82l5.56 39.59l.12.72A27.22 27.22 0 0 0 213.24 486h85.52a26.92 26.92 0 0 0 26.45-22.39l.09-.56l5.57-39.67a16 16 0 0 1 8.18-11.82c3.42-1.84 6.76-3.79 10-5.82a15.92 15.92 0 0 1 14.43-1.27l37.13 14.95l.35.14a26.85 26.85 0 0 0 32.48-11.34a3 3 0 0 1 .13-.22l42.71-73.89a26.7 26.7 0 0 0-5.89-34.11m-134.48-40.24a80 80 0 1 1-83.66-83.67a80.21 80.21 0 0 1 83.66 83.67\\\"/>\"},\"sparkles\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M208 512a24.84 24.84 0 0 1-23.34-16l-39.84-103.6a16.06 16.06 0 0 0-9.19-9.19L32 343.34a25 25 0 0 1 0-46.68l103.6-39.84a16.06 16.06 0 0 0 9.19-9.19L184.66 144a25 25 0 0 1 46.68 0l39.84 103.6a16.06 16.06 0 0 0 9.19 9.19l103 39.63a25.49 25.49 0 0 1 16.63 24.1a24.82 24.82 0 0 1-16 22.82l-103.6 39.84a16.06 16.06 0 0 0-9.19 9.19L231.34 496A24.84 24.84 0 0 1 208 512M88 176a14.67 14.67 0 0 1-13.69-9.4l-16.86-43.84a7.28 7.28 0 0 0-4.21-4.21L9.4 101.69a14.67 14.67 0 0 1 0-27.38l43.84-16.86a7.3 7.3 0 0 0 4.21-4.21L74.16 9.79A15 15 0 0 1 86.23.11a14.67 14.67 0 0 1 15.46 9.29l16.86 43.84a7.3 7.3 0 0 0 4.21 4.21l43.84 16.86a14.67 14.67 0 0 1 0 27.38l-43.84 16.86a7.28 7.28 0 0 0-4.21 4.21l-16.86 43.84A14.67 14.67 0 0 1 88 176m312 80a16 16 0 0 1-14.93-10.26l-22.84-59.37a8 8 0 0 0-4.6-4.6l-59.37-22.84a16 16 0 0 1 0-29.86l59.37-22.84a8 8 0 0 0 4.6-4.6l22.67-58.95a16.45 16.45 0 0 1 13.17-10.57a16 16 0 0 1 16.86 10.15l22.84 59.37a8 8 0 0 0 4.6 4.6l59.37 22.84a16 16 0 0 1 0 29.86l-59.37 22.84a8 8 0 0 0-4.6 4.6l-22.84 59.37A16 16 0 0 1 400 256\\\"/>\"},\"sparkles-outline\":{\"body\":\"<path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"32\\\" d=\\\"M259.92 262.91L216.4 149.77a9 9 0 0 0-16.8 0l-43.52 113.14a9 9 0 0 1-5.17 5.17L37.77 311.6a9 9 0 0 0 0 16.8l113.14 43.52a9 9 0 0 1 5.17 5.17l43.52 113.14a9 9 0 0 0 16.8 0l43.52-113.14a9 9 0 0 1 5.17-5.17l113.14-43.52a9 9 0 0 0 0-16.8l-113.14-43.52a9 9 0 0 1-5.17-5.17M108 68L88 16L68 68L16 88l52 20l20 52l20-52l52-20zm318.67 49.33L400 48l-26.67 69.33L304 144l69.33 26.67L400 240l26.67-69.33L496 144z\\\"/>\"},\"star\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M394 480a16 16 0 0 1-9.39-3L256 383.76L127.39 477a16 16 0 0 1-24.55-18.08L153 310.35L23 221.2a16 16 0 0 1 9-29.2h160.38l48.4-148.95a16 16 0 0 1 30.44 0l48.4 149H480a16 16 0 0 1 9.05 29.2L359 310.35l50.13 148.53A16 16 0 0 1 394 480\\\"/>\"},\"swap-horizontal\":{\"body\":\"<path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"32\\\" d=\\\"m304 48l112 112l-112 112m94.87-112H96m112 304L96 352l112-112m-94 112h302\\\"/>\"},\"swap-vertical\":{\"body\":\"<path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"32\\\" d=\\\"M464 208L352 96L240 208m112-94.87V416M48 304l112 112l112-112m-112 94V96\\\"/>\"},\"trash\":{\"body\":\"<path fill=\\\"none\\\" d=\\\"M296 64h-80a7.91 7.91 0 0 0-8 8v24h96V72a7.91 7.91 0 0 0-8-8\\\"/><path fill=\\\"currentColor\\\" d=\\\"M432 96h-96V72a40 40 0 0 0-40-40h-80a40 40 0 0 0-40 40v24H80a16 16 0 0 0 0 32h17l19 304.92c1.42 26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 0 0 0-32M192.57 416H192a16 16 0 0 1-16-15.43l-8-224a16 16 0 1 1 32-1.14l8 224A16 16 0 0 1 192.57 416M272 400a16 16 0 0 1-32 0V176a16 16 0 0 1 32 0Zm32-304h-96V72a7.91 7.91 0 0 1 8-8h80a7.91 7.91 0 0 1 8 8Zm32 304.57A16 16 0 0 1 320 416h-.58A16 16 0 0 1 304 399.43l8-224a16 16 0 1 1 32 1.14Z\\\"/>\"},\"warning\":{\"body\":\"<path fill=\\\"currentColor\\\" d=\\\"M449.07 399.08L278.64 82.58c-12.08-22.44-44.26-22.44-56.35 0L51.87 399.08A32 32 0 0 0 80 446.25h340.89a32 32 0 0 0 28.18-47.17m-198.6-1.83a20 20 0 1 1 20-20a20 20 0 0 1-20 20m21.72-201.15l-5.74 122a16 16 0 0 1-32 0l-5.74-121.95a21.73 21.73 0 0 1 21.5-22.69h.21a21.74 21.74 0 0 1 21.73 22.7Z\\\"/>\"},\"warning-outline\":{\"body\":\"<path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"32\\\" d=\\\"M85.57 446.25h340.86a32 32 0 0 0 28.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0 0 28.17 47.17\\\"/><path fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"32\\\" d=\\\"m250.26 195.39l5.74 122l5.73-121.95a5.74 5.74 0 0 0-5.79-6a5.74 5.74 0 0 0-5.68 5.95\\\"/><path fill=\\\"currentColor\\\" d=\\\"M256 397.25a20 20 0 1 1 20-20a20 20 0 0 1-20 20\\\"/>\"}}"),
	lastModified: 1795283159,
	width: 512,
	height: 512
});
// \0virtual:pwa-info
var pwaInfo = {
	"webManifest": {
		"linkTag": "<link rel=\"manifest\" href=\"/manifest.webmanifest\">"
	}
};
// src/lib/components/BrandMark.svelte
function BrandMark($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { hideText = false } = $$props;
		const cut = APP_NAME.lastIndexOf(" cadeaux");
		const nameLines = cut > 0 ? [APP_NAME.slice(0, cut), APP_NAME.slice(cut + 1)] : [APP_NAME, ""];
		$$renderer.push(`<span class="paper-brand"><img class="paper-brand-icon" alt="" height="256" src="/logo.webp" width="230"/> <span${attr_class(clsx(["paper-brand-name", hideText && "hidden sm:inline"]))}>${escape_html(nameLines[0])} <br/> ${escape_html(nameLines[1])}</span></span>`);
	});
}
// node_modules/.pnpm/@zag-js+utils@1.39.1/node_modules/@zag-js/utils/dist/chunk-MXGZDBDQ.mjs
var __defProp = Object.defineProperty;
var __typeError = (msg) => {
	throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
// node_modules/.pnpm/@zag-js+utils@1.39.1/node_modules/@zag-js/utils/dist/timers.mjs
var currentTime = () => performance.now();
var _tick;
var Timer = class {
	constructor(onTick) {
		this.onTick = onTick;
		__publicField(this, "frameId", null);
		__publicField(this, "pausedAtMs", null);
		__publicField(this, "context");
		__publicField(this, "cancelFrame", () => {
			if (this.frameId === null) return;
			cancelAnimationFrame(this.frameId);
			this.frameId = null;
		});
		__publicField(this, "setStartMs", (startMs) => {
			this.context.startMs = startMs;
		});
		__publicField(this, "start", () => {
			if (this.frameId !== null) return;
			const now = currentTime();
			if (this.pausedAtMs !== null) {
				this.context.startMs += now - this.pausedAtMs;
				this.pausedAtMs = null;
			} else this.context.startMs = now;
			this.frameId = requestAnimationFrame(__privateGet(this, _tick));
		});
		__publicField(this, "pause", () => {
			if (this.frameId === null) return;
			this.cancelFrame();
			this.pausedAtMs = currentTime();
		});
		__publicField(this, "stop", () => {
			if (this.frameId === null) return;
			this.cancelFrame();
			this.pausedAtMs = null;
		});
		__privateAdd(this, _tick, (now) => {
			this.context.now = now;
			this.context.deltaMs = now - this.context.startMs;
			if (this.onTick(this.context) === false) {
				this.stop();
				return;
			}
			this.frameId = requestAnimationFrame(__privateGet(this, _tick));
		});
		this.context = {
			now: 0,
			startMs: currentTime(),
			deltaMs: 0
		};
	}
	get elapsedMs() {
		if (this.pausedAtMs !== null) return this.pausedAtMs - this.context.startMs;
		return currentTime() - this.context.startMs;
	}
};
_tick = /* @__PURE__ */ new WeakMap();
function setRafTimeout(fn, delayMs) {
	const timer = new Timer(({ deltaMs }) => {
		if (deltaMs >= delayMs) {
			fn();
			return false;
		}
	});
	timer.start();
	return () => timer.stop();
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/toast/modules/root-context.js
var RootContext = createContext();
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/toast/anatomy/action-trigger.svelte
function Action_trigger($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const toast = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$8 = derived(() => mergeProps(toast().getActionTriggerProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$8());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><button${attributes({ ...attributes$8() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></button>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/internal/components/x.svelte
function X($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const rest = derived(() => exclude_from_object(props, []));
		const attributes$7 = derived(() => mergeProps({
			xmlns: "http://www.w3.org/2000/svg",
			width: "24",
			height: "24",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2",
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}, rest()));
		$$renderer.push(`<svg${attributes({ ...attributes$7() }, void 0, void 0, void 0, 3)}><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/toast/anatomy/close-trigger.svelte
function x($$renderer) {
	X($$renderer, {});
}
function Close_trigger($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const toast = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => fallback(props.children, x)), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$6 = derived(() => mergeProps(toast().getCloseTriggerProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$6());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><button${attributes({ ...attributes$6() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></button>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/toast/anatomy/description.svelte
function Description($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const toast = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$5 = derived(() => mergeProps(toast().getDescriptionProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$5());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$5() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/toast/modules/group-context.js
var GroupContext = createContext();
var parts = createAnatomy("toast").parts("group", "root", "title", "description", "actionTrigger", "closeTrigger").build();
// node_modules/.pnpm/@zag-js+toast@1.39.1/node_modules/@zag-js/toast/dist/toast.dom.mjs
var getRegionId = (placement) => `toast-group:${placement}`;
var getRegionEl = (ctx, placement) => ctx.getById(`toast-group:${placement}`);
var getRootId = (ctx) => `toast:${ctx.id}`;
var getRootEl = (ctx) => ctx.getById(getRootId(ctx));
var getTitleId = (ctx) => `toast:${ctx.id}:title`;
var getDescriptionId = (ctx) => `toast:${ctx.id}:description`;
var getCloseTriggerId = (ctx) => `toast${ctx.id}:close`;
// node_modules/.pnpm/@zag-js+toast@1.39.1/node_modules/@zag-js/toast/dist/toast.utils.mjs
var defaultTimeouts = {
	info: 5e3,
	error: 5e3,
	success: 2e3,
	loading: Infinity,
	warning: 5e3,
	DEFAULT: 5e3
};
function getToastDuration(duration, type) {
	return duration ?? defaultTimeouts[type] ?? defaultTimeouts.DEFAULT;
}
var getOffsets = (offsets) => typeof offsets === "string" ? {
	left: offsets,
	right: offsets,
	bottom: offsets,
	top: offsets
} : offsets;
function getGroupPlacementStyle(service, placement) {
	const { prop, computed, context } = service;
	const { offsets, gap } = prop("store").attrs;
	const heights = context.get("heights");
	const computedOffset = getOffsets(offsets);
	const rtl = prop("dir") === "rtl";
	const computedPlacement = placement.replace("-start", rtl ? "-right" : "-left").replace("-end", rtl ? "-left" : "-right");
	const isRighty = computedPlacement.includes("right");
	const isLefty = computedPlacement.includes("left");
	const styles = {
		position: "fixed",
		pointerEvents: computed("count") > 0 ? void 0 : "none",
		display: "flex",
		flexDirection: "column",
		"--gap": `${gap}px`,
		"--first-height": `${heights[0]?.height || 0}px`,
		"--viewport-offset-left": computedOffset.left,
		"--viewport-offset-right": computedOffset.right,
		"--viewport-offset-top": computedOffset.top,
		"--viewport-offset-bottom": computedOffset.bottom,
		zIndex: MAX_Z_INDEX
	};
	let alignItems = "center";
	if (isRighty) alignItems = "flex-end";
	if (isLefty) alignItems = "flex-start";
	styles.alignItems = alignItems;
	if (computedPlacement.includes("top")) styles.top = `max(env(safe-area-inset-top, 0px), ${computedOffset.top})`;
	if (computedPlacement.includes("bottom")) styles.bottom = `max(env(safe-area-inset-bottom, 0px), ${computedOffset.bottom})`;
	if (!computedPlacement.includes("left")) styles.insetInlineEnd = `calc(env(safe-area-inset-right, 0px) + ${computedOffset.right})`;
	if (!computedPlacement.includes("right")) styles.insetInlineStart = `calc(env(safe-area-inset-left, 0px) + ${computedOffset.left})`;
	return styles;
}
function getPlacementStyle(service, visible) {
	const { prop, context, computed } = service;
	const parent = prop("parent");
	const placement = parent.computed("placement");
	const { gap } = parent.prop("store").attrs;
	const [side] = placement.split("-");
	const mounted = context.get("mounted");
	const remainingTime = context.get("remainingTime");
	const height = computed("height");
	const frontmost = computed("frontmost");
	const sibling = !frontmost;
	const overlap = !prop("stacked");
	const stacked = prop("stacked");
	const duration = prop("type") === "loading" ? Number.MAX_SAFE_INTEGER : remainingTime;
	const offset = computed("heightIndex") * gap + computed("heightBefore");
	const styles = {
		position: "absolute",
		pointerEvents: "auto",
		"--opacity": "0",
		"--remove-delay": `${prop("removeDelay")}ms`,
		"--duration": `${duration}ms`,
		"--initial-height": `${height}px`,
		"--offset": `${offset}px`,
		"--index": prop("index"),
		"--z-index": computed("zIndex"),
		"--lift-amount": "calc(var(--lift) * var(--gap))",
		"--y": "100%",
		"--x": "0"
	};
	const assign = (overrides) => Object.assign(styles, overrides);
	if (side === "top") assign({
		top: "0",
		"--sign": "-1",
		"--y": "-100%",
		"--lift": "1"
	});
	else if (side === "bottom") assign({
		bottom: "0",
		"--sign": "1",
		"--y": "100%",
		"--lift": "-1"
	});
	if (mounted) {
		assign({
			"--y": "0",
			"--opacity": "1"
		});
		if (stacked) assign({
			"--y": "calc(var(--lift) * var(--offset))",
			"--height": "var(--initial-height)"
		});
	}
	if (!visible) assign({
		"--opacity": "0",
		pointerEvents: "none"
	});
	if (sibling && overlap) {
		assign({
			"--base-scale": "var(--index) * 0.05 + 1",
			"--y": "calc(var(--lift-amount) * var(--index))",
			"--scale": "calc(-1 * var(--base-scale))",
			"--height": "var(--first-height)"
		});
		if (!visible) assign({ "--y": "calc(var(--sign) * 40%)" });
	}
	if (sibling && stacked && !visible) assign({ "--y": "calc(var(--lift) * var(--offset) + var(--lift) * -100%)" });
	if (frontmost && !visible) assign({ "--y": "calc(var(--lift) * -100%)" });
	return styles;
}
function getGhostBeforeStyle(service, visible) {
	const { computed } = service;
	const styles = {
		position: "absolute",
		inset: "0",
		scale: "1 2",
		pointerEvents: visible ? "none" : "auto"
	};
	const assign = (overrides) => Object.assign(styles, overrides);
	if (computed("frontmost") && !visible) assign({ height: "calc(var(--initial-height) + 80%)" });
	return styles;
}
function getGhostAfterStyle() {
	return {
		position: "absolute",
		left: "0",
		height: "calc(var(--gap) + 2px)",
		bottom: "100%",
		width: "100%"
	};
}
// node_modules/.pnpm/@zag-js+toast@1.39.1/node_modules/@zag-js/toast/dist/toast-group.connect.mjs
function groupConnect(service, normalize) {
	const { context, prop, send, refs, computed } = service;
	return {
		getCount() {
			return context.get("toasts").length;
		},
		getToasts() {
			return context.get("toasts");
		},
		getGroupProps(options = {}) {
			const { label = "Notifications" } = options;
			const { hotkey } = prop("store").attrs;
			const hotkeyLabel = hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
			const placement = computed("placement");
			const [side, align = "center"] = placement.split("-");
			return normalize.element({
				...parts.group.attrs,
				dir: prop("dir"),
				tabIndex: -1,
				role: "region",
				"aria-label": `${label}, ${placement} (${hotkeyLabel})`,
				id: getRegionId(placement),
				"data-placement": placement,
				"data-side": side,
				"data-align": align,
				"aria-live": "polite",
				"aria-relevant": "additions text",
				"aria-atomic": "false",
				style: getGroupPlacementStyle(service, placement),
				onMouseEnter() {
					if (refs.get("ignoreMouseTimer").isActive()) return;
					send({
						type: "REGION.POINTER_ENTER",
						placement
					});
				},
				onMouseMove() {
					if (refs.get("ignoreMouseTimer").isActive()) return;
					send({
						type: "REGION.POINTER_ENTER",
						placement
					});
				},
				onMouseLeave() {
					if (refs.get("ignoreMouseTimer").isActive()) return;
					send({
						type: "REGION.POINTER_LEAVE",
						placement
					});
				},
				onFocus(event) {
					send({
						type: "REGION.FOCUS",
						target: event.relatedTarget
					});
				},
				onBlur(event) {
					if (refs.get("isFocusWithin") && !contains(event.currentTarget, event.relatedTarget)) queueMicrotask(() => send({ type: "REGION.BLUR" }));
				}
			});
		},
		subscribe(fn) {
			return prop("store").subscribe(() => fn(context.get("toasts")));
		}
	};
}
// node_modules/.pnpm/@zag-js+toast@1.39.1/node_modules/@zag-js/toast/dist/toast-group.machine.mjs
var { guards, createMachine } = setup();
var { and } = guards;
var groupMachine = createMachine({
	props({ props }) {
		return {
			dir: "ltr",
			id: uuid(),
			...props,
			store: props.store
		};
	},
	initialState({ prop }) {
		return prop("store").attrs.overlap ? "overlap" : "stack";
	},
	refs() {
		return {
			lastFocusedEl: null,
			isFocusWithin: false,
			isPointerWithin: false,
			ignoreMouseTimer: AnimationFrame.create(),
			dismissableCleanup: void 0
		};
	},
	context({ bindable }) {
		return {
			toasts: bindable(() => ({
				defaultValue: [],
				sync: true,
				hash: (toasts) => toasts.map((t) => t.id).join(",")
			})),
			heights: bindable(() => ({
				defaultValue: [],
				sync: true
			}))
		};
	},
	computed: {
		count: ({ context }) => context.get("toasts").length,
		overlap: ({ prop }) => prop("store").attrs.overlap,
		placement: ({ prop }) => prop("store").attrs.placement
	},
	effects: [
		"subscribeToStore",
		"trackDocumentVisibility",
		"trackHotKeyPress"
	],
	watch({ track, context, action }) {
		track([() => context.hash("toasts")], () => {
			queueMicrotask(() => {
				action(["collapsedIfEmpty", "setDismissableBranch"]);
			});
		});
	},
	exit: [
		"clearDismissableBranch",
		"clearLastFocusedEl",
		"clearMouseEventTimer"
	],
	on: {
		"DOC.HOTKEY": { actions: ["focusRegionEl"] },
		"REGION.BLUR": [
			{
				guard: and("isOverlapping", "isPointerOut"),
				target: "overlap",
				actions: [
					"collapseToasts",
					"resumeToasts",
					"restoreFocusIfPointerOut"
				]
			},
			{
				guard: "isPointerOut",
				target: "stack",
				actions: ["resumeToasts", "restoreFocusIfPointerOut"]
			},
			{ actions: ["clearFocusWithin"] }
		],
		"TOAST.REMOVE": { actions: [
			"removeToast",
			"removeHeight",
			"ignoreMouseEventsTemporarily"
		] },
		"TOAST.PAUSE": { actions: ["pauseToasts"] }
	},
	states: {
		stack: { on: {
			"REGION.POINTER_LEAVE": [{
				guard: "isOverlapping",
				target: "overlap",
				actions: [
					"clearPointerWithin",
					"resumeToasts",
					"collapseToasts"
				]
			}, { actions: ["clearPointerWithin", "resumeToasts"] }],
			"REGION.OVERLAP": {
				target: "overlap",
				actions: ["collapseToasts"]
			},
			"REGION.FOCUS": { actions: ["setLastFocusedEl", "pauseToasts"] },
			"REGION.POINTER_ENTER": { actions: ["setPointerWithin", "pauseToasts"] }
		} },
		overlap: { on: {
			"REGION.STACK": {
				target: "stack",
				actions: ["expandToasts"]
			},
			"REGION.POINTER_ENTER": {
				target: "stack",
				actions: [
					"setPointerWithin",
					"pauseToasts",
					"expandToasts"
				]
			},
			"REGION.FOCUS": {
				target: "stack",
				actions: [
					"setLastFocusedEl",
					"pauseToasts",
					"expandToasts"
				]
			}
		} }
	},
	implementations: {
		guards: {
			isOverlapping: ({ computed }) => computed("overlap"),
			isPointerOut: ({ refs }) => !refs.get("isPointerWithin")
		},
		effects: {
			subscribeToStore({ context, prop }) {
				const store = prop("store");
				context.set("toasts", store.getVisibleToasts());
				return store.subscribe((toast) => {
					if (toast.dismiss) {
						context.set("toasts", (prev) => prev.filter((t) => t.id !== toast.id));
						return;
					}
					context.set("toasts", (prev) => {
						const index = prev.findIndex((t) => t.id === toast.id);
						if (index !== -1) return [
							...prev.slice(0, index),
							{
								...prev[index],
								...toast
							},
							...prev.slice(index + 1)
						];
						return [toast, ...prev];
					});
				});
			},
			trackHotKeyPress({ prop, send }) {
				const handleKeyDown = (event) => {
					const { hotkey } = prop("store").attrs;
					if (!hotkey.every((key) => event[key] || event.code === key)) return;
					send({ type: "DOC.HOTKEY" });
				};
				return addDomEvent(document, "keydown", handleKeyDown, { capture: true });
			},
			trackDocumentVisibility({ prop, send, scope }) {
				const { pauseOnPageIdle } = prop("store").attrs;
				if (!pauseOnPageIdle) return;
				const doc = scope.getDoc();
				return addDomEvent(doc, "visibilitychange", () => {
					send({ type: doc.visibilityState === "hidden" ? "PAUSE_ALL" : "RESUME_ALL" });
				});
			}
		},
		actions: {
			setDismissableBranch({ refs, context, computed, scope }) {
				const toasts = context.get("toasts");
				const placement = computed("placement");
				const hasToasts = toasts.length > 0;
				if (!hasToasts) {
					refs.get("dismissableCleanup")?.();
					return;
				}
				if (hasToasts && refs.get("dismissableCleanup")) return;
				const groupEl = () => getRegionEl(scope, placement);
				const cleanup = trackDismissableBranch(groupEl, { defer: true });
				refs.set("dismissableCleanup", cleanup);
			},
			clearDismissableBranch({ refs }) {
				refs.get("dismissableCleanup")?.();
			},
			focusRegionEl({ scope, computed }) {
				queueMicrotask(() => {
					getRegionEl(scope, computed("placement"))?.focus();
				});
			},
			pauseToasts({ prop }) {
				prop("store").pause();
			},
			resumeToasts({ prop }) {
				prop("store").resume();
			},
			expandToasts({ prop }) {
				prop("store").expand();
			},
			collapseToasts({ prop }) {
				prop("store").collapse();
			},
			removeToast({ prop, event }) {
				prop("store").remove(event.id);
			},
			removeHeight({ event, context }) {
				if (event?.id == null) return;
				queueMicrotask(() => {
					context.set("heights", (heights) => heights.filter((height) => height.id !== event.id));
				});
			},
			collapsedIfEmpty({ send, computed }) {
				if (!computed("overlap") || computed("count") > 1) return;
				send({ type: "REGION.OVERLAP" });
			},
			setLastFocusedEl({ refs, event }) {
				if (refs.get("isFocusWithin") || !event.target) return;
				refs.set("isFocusWithin", true);
				refs.set("lastFocusedEl", event.target);
			},
			restoreFocusIfPointerOut({ refs }) {
				if (!refs.get("lastFocusedEl") || refs.get("isPointerWithin")) return;
				refs.get("lastFocusedEl")?.focus({ preventScroll: true });
				refs.set("lastFocusedEl", null);
				refs.set("isFocusWithin", false);
			},
			setPointerWithin({ refs }) {
				refs.set("isPointerWithin", true);
			},
			clearPointerWithin({ refs }) {
				refs.set("isPointerWithin", false);
				if (refs.get("lastFocusedEl") && !refs.get("isFocusWithin")) {
					refs.get("lastFocusedEl")?.focus({ preventScroll: true });
					refs.set("lastFocusedEl", null);
				}
			},
			clearFocusWithin({ refs }) {
				refs.set("isFocusWithin", false);
			},
			clearLastFocusedEl({ refs }) {
				if (!refs.get("lastFocusedEl")) return;
				refs.get("lastFocusedEl")?.focus({ preventScroll: true });
				refs.set("lastFocusedEl", null);
				refs.set("isFocusWithin", false);
			},
			ignoreMouseEventsTemporarily({ refs }) {
				refs.get("ignoreMouseTimer").request();
			},
			clearMouseEventTimer({ refs }) {
				refs.get("ignoreMouseTimer").cancel();
			}
		}
	}
});
// node_modules/.pnpm/@zag-js+toast@1.39.1/node_modules/@zag-js/toast/dist/toast.connect.mjs
function connect(service, normalize) {
	const { state, send, prop, scope, context, computed } = service;
	const translations = prop("translations");
	const visible = state.hasTag("visible");
	const paused = state.hasTag("paused");
	const mounted = context.get("mounted");
	const frontmost = computed("frontmost");
	const placement = prop("parent").computed("placement");
	const type = prop("type");
	const stacked = prop("stacked");
	const title = prop("title");
	const description = prop("description");
	const action = prop("action");
	const [side, align = "center"] = placement.split("-");
	return {
		type,
		title,
		description,
		placement,
		visible,
		paused,
		closable: !!prop("closable"),
		pause() {
			send({ type: "PAUSE" });
		},
		resume() {
			send({ type: "RESUME" });
		},
		dismiss() {
			send({
				type: "DISMISS",
				src: "programmatic"
			});
		},
		getRootProps() {
			return normalize.element({
				...parts.root.attrs,
				dir: prop("dir"),
				id: getRootId(scope),
				"data-state": visible ? "open" : "closed",
				"data-type": type,
				"data-placement": placement,
				"data-align": align,
				"data-side": side,
				"data-mounted": dataAttr(mounted),
				"data-paused": dataAttr(paused),
				"data-first": dataAttr(frontmost),
				"data-sibling": dataAttr(!frontmost),
				"data-stack": dataAttr(stacked),
				"data-overlap": dataAttr(!stacked),
				role: "status",
				"aria-atomic": "true",
				"aria-describedby": description ? getDescriptionId(scope) : void 0,
				"aria-labelledby": title ? getTitleId(scope) : void 0,
				tabIndex: 0,
				style: getPlacementStyle(service, visible),
				onKeyDown(event) {
					if (event.defaultPrevented) return;
					if (event.key == "Escape") {
						send({
							type: "DISMISS",
							src: "keyboard"
						});
						event.preventDefault();
					}
				}
			});
		},
		getGhostBeforeProps() {
			return normalize.element({
				"data-ghost": "before",
				style: getGhostBeforeStyle(service, visible)
			});
		},
		getGhostAfterProps() {
			return normalize.element({
				"data-ghost": "after",
				style: getGhostAfterStyle()
			});
		},
		getTitleProps() {
			return normalize.element({
				...parts.title.attrs,
				id: getTitleId(scope)
			});
		},
		getDescriptionProps() {
			return normalize.element({
				...parts.description.attrs,
				id: getDescriptionId(scope)
			});
		},
		getActionTriggerProps() {
			return normalize.button({
				...parts.actionTrigger.attrs,
				type: "button",
				onClick(event) {
					if (event.defaultPrevented) return;
					action?.onClick?.();
					send({
						type: "DISMISS",
						src: "user"
					});
				}
			});
		},
		getCloseTriggerProps() {
			return normalize.button({
				id: getCloseTriggerId(scope),
				...parts.closeTrigger.attrs,
				type: "button",
				"aria-label": translations?.closeTriggerLabel,
				onClick(event) {
					if (event.defaultPrevented) return;
					send({
						type: "DISMISS",
						src: "user"
					});
				}
			});
		}
	};
}
// node_modules/.pnpm/@zag-js+toast@1.39.1/node_modules/@zag-js/toast/dist/toast.machine.mjs
var { not } = createGuards();
var machine = createMachine$1({
	props({ props }) {
		ensureProps(props, [
			"id",
			"type",
			"parent",
			"removeDelay"
		], "toast");
		return {
			closable: true,
			...props,
			translations: {
				closeTriggerLabel: "Dismiss notification",
				...props.translations
			},
			duration: getToastDuration(props.duration, props.type)
		};
	},
	initialState({ prop }) {
		return prop("type") === "loading" || prop("duration") === Infinity ? "visible:persist" : "visible";
	},
	context({ prop, bindable }) {
		return {
			remainingTime: bindable(() => ({ defaultValue: getToastDuration(prop("duration"), prop("type")) })),
			createdAt: bindable(() => ({ defaultValue: Date.now() })),
			mounted: bindable(() => ({ defaultValue: false })),
			initialHeight: bindable(() => ({ defaultValue: 0 }))
		};
	},
	refs() {
		return {
			closeTimerStartTime: Date.now(),
			lastCloseStartTimerStartTime: 0
		};
	},
	computed: {
		zIndex: ({ prop }) => {
			const toasts = prop("parent").context.get("toasts");
			const index = toasts.findIndex((toast) => toast.id === prop("id"));
			return toasts.length - index;
		},
		height: ({ prop }) => {
			return prop("parent").context.get("heights").find((height2) => height2.id === prop("id"))?.height ?? 0;
		},
		heightIndex: ({ prop }) => {
			return prop("parent").context.get("heights").findIndex((height) => height.id === prop("id"));
		},
		frontmost: ({ prop }) => prop("index") === 0,
		heightBefore: ({ prop }) => {
			const heights = prop("parent").context.get("heights");
			const heightIndex = heights.findIndex((height) => height.id === prop("id"));
			return heights.reduce((prev, curr, reducerIndex) => {
				if (reducerIndex >= heightIndex) return prev;
				return prev + curr.height;
			}, 0);
		},
		shouldPersist: ({ prop }) => prop("type") === "loading" || prop("duration") === Infinity
	},
	watch({ track, prop, send }) {
		track([() => prop("message")], () => {
			const message = prop("message");
			if (message) send({
				type: message,
				src: "programmatic"
			});
		});
		track([() => prop("type"), () => prop("duration")], () => {
			send({ type: "UPDATE" });
		});
	},
	on: {
		UPDATE: [{
			guard: "shouldPersist",
			target: "visible:persist",
			actions: ["resetCloseTimer"]
		}, {
			target: "visible:updating",
			actions: ["resetCloseTimer"]
		}],
		MEASURE: { actions: ["measureHeight"] }
	},
	entry: [
		"setMounted",
		"measureHeight",
		"invokeOnVisible"
	],
	effects: ["trackHeight"],
	states: {
		"visible:updating": {
			tags: ["visible", "updating"],
			effects: ["waitForNextTick"],
			on: { SHOW: { target: "visible" } }
		},
		"visible:persist": {
			tags: ["visible", "paused"],
			on: {
				RESUME: {
					guard: not("isLoadingType"),
					target: "visible",
					actions: ["setCloseTimer"]
				},
				DISMISS: { target: "dismissing" }
			}
		},
		visible: {
			tags: ["visible"],
			effects: ["waitForDuration"],
			on: {
				DISMISS: { target: "dismissing" },
				PAUSE: {
					target: "visible:persist",
					actions: ["syncRemainingTime"]
				}
			}
		},
		dismissing: {
			entry: ["invokeOnDismiss"],
			effects: ["waitForRemoveDelay"],
			on: { REMOVE: {
				target: "unmounted",
				actions: ["notifyParentToRemove"]
			} }
		},
		unmounted: { entry: ["invokeOnUnmount"] }
	},
	implementations: {
		effects: {
			waitForRemoveDelay({ prop, send }) {
				return setRafTimeout(() => {
					send({
						type: "REMOVE",
						src: "timer"
					});
				}, prop("removeDelay"));
			},
			waitForDuration({ send, context, computed }) {
				if (computed("shouldPersist")) return;
				return setRafTimeout(() => {
					send({
						type: "DISMISS",
						src: "timer"
					});
				}, context.get("remainingTime"));
			},
			waitForNextTick({ send }) {
				return setRafTimeout(() => {
					send({
						type: "SHOW",
						src: "timer"
					});
				}, 0);
			},
			trackHeight({ scope, prop }) {
				let cleanup;
				raf(() => {
					const rootEl = getRootEl(scope);
					if (!rootEl) return;
					const syncHeight = () => {
						const originalHeight = rootEl.style.height;
						rootEl.style.height = "auto";
						const height = rootEl.getBoundingClientRect().height;
						rootEl.style.height = originalHeight;
						const item = {
							id: prop("id"),
							height
						};
						setHeight(prop("parent"), item);
					};
					const observer = new (scope.getWin()).MutationObserver(syncHeight);
					observer.observe(rootEl, {
						childList: true,
						subtree: true,
						characterData: true
					});
					cleanup = () => observer.disconnect();
				});
				return () => cleanup?.();
			}
		},
		guards: {
			isLoadingType: ({ prop }) => prop("type") === "loading",
			shouldPersist: ({ computed }) => computed("shouldPersist")
		},
		actions: {
			setMounted({ context }) {
				raf(() => {
					context.set("mounted", true);
				});
			},
			measureHeight({ scope, prop, context }) {
				queueMicrotask(() => {
					const rootEl = getRootEl(scope);
					if (!rootEl) return;
					const originalHeight = rootEl.style.height;
					rootEl.style.height = "auto";
					const height = rootEl.getBoundingClientRect().height;
					rootEl.style.height = originalHeight;
					context.set("initialHeight", height);
					const item = {
						id: prop("id"),
						height
					};
					setHeight(prop("parent"), item);
				});
			},
			setCloseTimer({ refs }) {
				refs.set("closeTimerStartTime", Date.now());
			},
			resetCloseTimer({ context, refs, prop }) {
				refs.set("closeTimerStartTime", Date.now());
				context.set("remainingTime", getToastDuration(prop("duration"), prop("type")));
			},
			syncRemainingTime({ context, refs }) {
				context.set("remainingTime", (prev) => {
					const closeTimerStartTime = refs.get("closeTimerStartTime");
					const elapsedTime = Date.now() - closeTimerStartTime;
					refs.set("lastCloseStartTimerStartTime", Date.now());
					return prev - elapsedTime;
				});
			},
			notifyParentToRemove({ prop }) {
				prop("parent").send({
					type: "TOAST.REMOVE",
					id: prop("id")
				});
			},
			invokeOnDismiss({ prop, event }) {
				prop("onStatusChange")?.({
					status: "dismissing",
					src: event.src
				});
			},
			invokeOnUnmount({ prop }) {
				prop("onStatusChange")?.({ status: "unmounted" });
			},
			invokeOnVisible({ prop }) {
				prop("onStatusChange")?.({ status: "visible" });
			}
		}
	}
});
function setHeight(parent, item) {
	const { id, height } = item;
	parent.context.set("heights", (prev) => {
		if (!prev.find((i) => i.id === id)) return [{
			id,
			height
		}, ...prev];
		else return prev.map((i) => i.id === id ? {
			...i,
			height
		} : i);
	});
}
// node_modules/.pnpm/@zag-js+toast@1.39.1/node_modules/@zag-js/toast/dist/index.mjs
var group = {
	connect: groupConnect,
	machine: groupMachine
};
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/toast/anatomy/group.svelte
function Group($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const id = props_id($$renderer);
		const { $$slots, $$events, ...props } = $$props;
		const element = derived(() => props.element), children = derived(() => props.children), toaster = derived(() => props.toaster), rest = derived(() => exclude_from_object(props, [
			"element",
			"children",
			"toaster"
		]));
		const service = useMachine(group.machine, () => ({
			id,
			store: toaster()
		}));
		const api = derived(() => group.connect(service, normalizeProps));
		const attributes$4 = derived(() => mergeProps(api().getGroupProps(), rest()));
		GroupContext.provide(() => service);
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$4());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$4() })}><!--[-->`);
			const each_array = ensure_array_like(api().getToasts());
			for (let index = 0, $$length = each_array.length; index < $$length; index++) {
				let toast = each_array[index];
				children()?.($$renderer, {
					...toast,
					index
				});
				$$renderer.push(`<!---->`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/toast/anatomy/message.svelte
function Message($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$3 = derived(() => mergeProps({
			"data-scope": "toast",
			"data-part": "message"
		}, rest()));
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/toast/anatomy/root-context.svelte
function Root_context($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const toast = RootContext.consume();
		derived(() => props.children)()($$renderer, toast);
		$$renderer.push(`<!---->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/toast/anatomy/root.svelte
function Root($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const group = GroupContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), toastProps = derived(() => props.toast), rest = derived(() => exclude_from_object(props, [
			"element",
			"children",
			"toast"
		]));
		const service = useMachine(machine, () => ({
			...toastProps(),
			parent: group()
		}));
		const toast = derived(() => connect(service, normalizeProps));
		const attributes$2 = derived(() => mergeProps(toast().getRootProps(), rest()));
		RootContext.provide(() => toast());
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$2());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$2() })}><div${attributes({ ...toast().getGhostBeforeProps() })}></div> `);
			children()?.($$renderer);
			$$renderer.push(`<!----> <div${attributes({ ...toast().getGhostAfterProps() })}></div></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/toast/anatomy/title.svelte
function Title($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const toast = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$1 = derived(() => mergeProps(toast().getTitleProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$1());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$1() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/toast/modules/anatomy.js
var Toast = Object.assign(Root, {
	Context: Root_context,
	Group,
	Message,
	Title,
	Description,
	ActionTrigger: Action_trigger,
	CloseTrigger: Close_trigger
});
// src/lib/components/modals/GroupSelectModal.svelte
function GroupSelectModal($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { groups, onSubmit, $$slots, $$events, ...props } = $$props;
		const t = getFormatter();
		const locale = getLocale();
		let selectedGroup = void 0;
		function resetForm() {
			selectedGroup = [];
		}
		async function onFormSubmit() {
			await onSubmit(selectedGroup?.[0]);
			resetForm();
		}
		const collection = derived(() => useListCollection({
			items: groups.toSorted((a, b) => a.name.localeCompare(b.name, locale)),
			itemToString: (item) => item.name,
			itemToValue: (item) => item.id
		}));
		{
			function description($$renderer) {
				Listbox($$renderer, {
					collection: collection(),
					deselectable: true,
					onValueChange: (e) => selectedGroup = e.value,
					value: selectedGroup,
					children: ($$renderer) => {
						if (Listbox.Label) {
							$$renderer.push("<!--[-->");
							Listbox.Label($$renderer, {
								children: ($$renderer) => {
									$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.select-a-group-option"))}`);
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
						$$renderer.push(` `);
						if (Listbox.Content) {
							$$renderer.push("<!--[-->");
							Listbox.Content($$renderer, {
								children: ($$renderer) => {
									$$renderer.push(`<!--[-->`);
									const each_array = ensure_array_like(collection().items);
									for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
										let item = each_array[$$index];
										if (Listbox.Item) {
											$$renderer.push("<!--[-->");
											Listbox.Item($$renderer, {
												item,
												children: ($$renderer) => {
													if (Listbox.ItemText) {
														$$renderer.push("<!--[-->");
														Listbox.ItemText($$renderer, {
															children: ($$renderer) => {
																$$renderer.push(`<!---->${escape_html(item.name)}`);
															},
															$$slots: { default: true }
														});
														$$renderer.push("<!--]-->");
													} else {
														$$renderer.push("<!--[!-->");
														$$renderer.push("<!--]-->");
													}
													$$renderer.push(` `);
													if (Listbox.ItemIndicator) {
														$$renderer.push("<!--[-->");
														Listbox.ItemIndicator($$renderer, {});
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
			}
			function actions($$renderer, { neutralStyle, positiveStyle }) {
				if (Dialog.CloseTrigger) {
					$$renderer.push("<!--[-->");
					Dialog.CloseTrigger($$renderer, {
						class: neutralStyle,
						onclick: resetForm,
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.cancel"))}`);
						},
						$$slots: { default: true }
					});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
				$$renderer.push(` `);
				if (Dialog.CloseTrigger) {
					$$renderer.push("<!--[-->");
					Dialog.CloseTrigger($$renderer, {
						class: positiveStyle,
						onclick: onFormSubmit,
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.change-group"))}`);
						},
						$$slots: { default: true }
					});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
			}
			BaseModal($$renderer, spread_props([
				{ title: store_get($$store_subs ??= {}, "$t", t)("general.select-group") },
				props,
				{
					description,
					actions,
					$$slots: {
						description: true,
						actions: true
					}
				}
			]));
		}
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/navigation/NavMenu/GroupSubMenu.svelte
function GroupSubMenu($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { user, groups} = $$props;
		const t = getFormatter();
		let userAPI = derived(() => {
			if (user) return new UserAPI(user.id);
		});
		const changeGroup = async (groupId) => {
			if (groupId) {
				await userAPI()?.setActiveGroup(groupId);
				goto(resolve("/lists"), { });
			}
		};
		if (groups) {
			$$renderer.push(`<!--[0--><!--[-->`);
			const each_array = ensure_array_like(groups);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let group = each_array[$$index];
				if (group.active) {
					$$renderer.push("<!--[0-->");
					if (groups.length > 1) $$renderer.push(`<!--[0--><li><div class="flex w-full max-w-[24ch] flex-row items-center gap-x-4 px-4 py-2 md:max-w-full"><iconify-icon icon="ion:people"></iconify-icon> <span class="truncate">${escape_html(group.name)}</span></div></li>`);
					else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> `);
					if (group.isManager) $$renderer.push(`<!--[0--><li><a${attr("href", resolve("/admin/groups/[groupId]", { groupId: group.id }))}><iconify-icon icon="ion:settings"></iconify-icon> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.manage-group"))}</span></a></li>`);
					else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]-->`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]-->`);
			}
			$$renderer.push(`<!--]--> `);
			if (groups.length > 1) {
				$$renderer.push(`<!--[0--><li>`);
				{
					function trigger($$renderer, props) {
						$$renderer.push(`<button${attributes({
							...props,
							class: "list-option w-full"
						})}><iconify-icon icon="ion:swap-horizontal"></iconify-icon> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.change-group"))}</span></button>`);
					}
					GroupSelectModal($$renderer, {
						groups,
						onSubmit: changeGroup,
						trigger,
						$$slots: { trigger: true }
					});
				}
				$$renderer.push(`<!----></li>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/navigation/NavMenu/LightSwitch.svelte
function LightSwitch($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		head("cidru0", $$renderer, ($$renderer) => {
			$$renderer.push(`<script>
        (function initMode() {
            const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.documentElement.setAttribute("data-mode", dark ? "dark" : "light");
        })();
    <\/script>`);
			$$renderer.push(`<!---->`);
		});
	});
}
// src/lib/components/navigation/NavMenu/NavMenu.svelte
function NavMenu($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { user, groups, isProxyUser } = $$props;
		const t = getFormatter();
		let open = false;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (user) {
				$$renderer.push(`<!--[0--><div class="flex min-w-0 items-center">`);
				{
					function trigger($$renderer, props) {
						$$renderer.push(`<button${attributes({
							class: "paper-header-link",
							...props
						})}><span aria-hidden="true">${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.account"))}</span> <span class="sr-only">${escape_html(store_get($$store_subs ??= {}, "$t", t)("a11y.user-menu"))}</span></button>`);
					}
					function content($$renderer, props) {
						$$renderer.push(`<div${attributes({ ...props })}><nav class="card preset-filled-surface-100-900 list-nav p-4 shadow-xl" data-testid="user menu navigation"><ul><li><a href="/account"><iconify-icon icon="ion:person"></iconify-icon> <span class="flex-auto">${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.account"))}</span></a></li> <li><a href="/claims"><iconify-icon icon="ion:albums"></iconify-icon> <span class="flex-auto">${escape_html(store_get($$store_subs ??= {}, "$t", t)("app.my-claims"))}</span></a></li> `);
						if (user.roleId == Role.ADMIN) $$renderer.push(`<!--[0--><li><a href="/admin"><iconify-icon icon="ion:settings"></iconify-icon> <span class="flex-auto">${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.admin"))}</span></a></li>`);
						else $$renderer.push("<!--[-1-->");
						$$renderer.push(`<!--]--> <hr class="hr"/> `);
						GroupSubMenu($$renderer, {
							groups,
							user
						});
						$$renderer.push(`<!----> `);
						if (!isProxyUser) $$renderer.push(`<!--[0--><hr class="hr"/> <li><button class="list-option w-full"><iconify-icon icon="ion:log-out"></iconify-icon> <p>${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.sign-out"))}</p></button></li>`);
						else $$renderer.push("<!--[-1-->");
						$$renderer.push(`<!--]--></ul></nav></div>`);
					}
					Popup($$renderer, {
						zIndex: "z-20!",
						get open() {
							return open;
						},
						set open($$value) {
							open = $$value;
							$$settled = false;
						},
						trigger,
						content,
						$$slots: {
							trigger: true,
							content: true
						}
					});
				}
				$$renderer.push(`<!----></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			LightSwitch($$renderer);
			$$renderer.push(`<!---->`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/navigation/NavBar.svelte
function NavBar($$renderer, $$props) {
	const { user, groups, isProxyUser } = $$props;
	$$renderer.push(`<div class="paper-header"><a class="paper-header-brand" href="/">`);
	BrandMark($$renderer, {});
	$$renderer.push(`<!----></a> `);
	NavMenu($$renderer, {
		groups,
		isProxyUser,
		user
	});
	$$renderer.push(`<!----></div>`);
}
// node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.72.2/node_modules/svelte/src/motion/utils.js
/**
* @param {any} obj
* @returns {obj is Date}
*/
function is_date(obj) {
	return Object.prototype.toString.call(obj) === "[object Date]";
}
// node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.72.2/node_modules/svelte/src/motion/tweened.js
/**
* @template T
* @param {T} a
* @param {T} b
* @returns {(t: number) => T}
*/
function get_interpolator(a, b) {
	if (a === b || a !== a) return () => a;
	const type = typeof a;
	if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) throw new Error("Cannot interpolate values of different type");
	if (Array.isArray(a)) {
		const arr = b.map((bi, i) => {
			return get_interpolator(
				/** @type {Array<any>} */
				a[i],
				bi
			);
		});
		return (t) => arr.map((fn) => fn(t));
	}
	if (type === "object") {
		if (!a || !b) throw new Error("Object cannot be null");
		if (is_date(a) && is_date(b)) {
			const an = a.getTime();
			const delta = b.getTime() - an;
			return (t) => new Date(an + t * delta);
		}
		const keys = Object.keys(b);
		/** @type {Record<string, (t: number) => T>} */
		const interpolators = {};
		keys.forEach((key) => {
			interpolators[key] = get_interpolator(a[key], b[key]);
		});
		return (t) => {
			/** @type {Record<string, any>} */
			const result = {};
			keys.forEach((key) => {
				result[key] = interpolators[key](t);
			});
			return result;
		};
	}
	if (type === "number") {
		const delta = b - a;
		return (t) => a + t * delta;
	}
	return () => b;
}
/**
* A wrapper for a value that tweens smoothly to its target value. Changes to `tween.target` will cause `tween.current` to
* move towards it over time, taking account of the `delay`, `duration` and `easing` options.
*
* ```svelte
* <script>
* 	import { Tween } from 'svelte/motion';
*
* 	const tween = new Tween(0);
* <\/script>
*
* <input type="range" bind:value={tween.target} />
* <input type="range" bind:value={tween.current} disabled />
* ```
* @template T
* @since 5.8.0
*/
var Tween = class Tween {
	#current;
	#target;
	/** @type {TweenOptions<T>} */
	#defaults;
	/** @type {import('../internal/client/types').Task | null} */
	#task = null;
	/**
	* @param {T} value
	* @param {TweenOptions<T>} options
	*/
	constructor(value, options = {}) {
		this.#current = /* @__PURE__ */ state(value);
		this.#target = /* @__PURE__ */ state(value);
		this.#defaults = options;
	}
	/**
	* Create a tween whose value is bound to the return value of `fn`. This must be called
	* inside an effect root (for example, during component initialisation).
	*
	* ```svelte
	* <script>
	* 	import { Tween } from 'svelte/motion';
	*
	* 	let { number } = $props();
	*
	* 	const tween = Tween.of(() => number);
	* <\/script>
	* ```
	* @template U
	* @param {() => U} fn
	* @param {TweenOptions<U>} [options]
	*/
	static of(fn, options) {
		const tween = new Tween(fn(), options);
		render_effect(() => {
			tween.set(fn());
		});
		return tween;
	}
	/**
	* Sets `tween.target` to `value` and returns a `Promise` that resolves if and when `tween.current` catches up to it.
	*
	* If `options` are provided, they will override the tween's defaults.
	* @param {T} value
	* @param {TweenOptions<T>} [options]
	* @returns
	*/
	set(value, options) {
		set(this.#target, value);
		let { delay = 0, duration = 400, easing = linear, interpolate = get_interpolator } = {
			...this.#defaults,
			...options
		};
		if (duration === 0) {
			this.#task?.abort();
			set(this.#current, value);
			return Promise.resolve();
		}
		const start = raf$1.now() + delay;
		/** @type {(t: number) => T} */
		let fn;
		let started = false;
		let previous_task = this.#task;
		this.#task = loop((now) => {
			if (now < start) return true;
			if (!started) {
				started = true;
				const prev = this.#current.v;
				fn = interpolate(prev, value);
				if (typeof duration === "function") duration = duration(prev, value);
				previous_task?.abort();
				previous_task = null;
			}
			const elapsed = now - start;
			if (elapsed > duration) {
				set(this.#current, value);
				return false;
			}
			set(this.#current, fn(easing(elapsed / duration)));
			return true;
		});
		return this.#task.promise;
	}
	get current() {
		return get(this.#current);
	}
	get target() {
		return get(this.#target);
	}
	set target(v) {
		this.set(v);
	}
};
// src/lib/components/navigation/NavigationLoadingBar.svelte
function NavigationLoadingBar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const progress = new Tween(0, {
			duration: 1e3,
			easing: cubicOut
		});
		if (progress.current) $$renderer.push(`<!--[0--><div class="bg-surface-50/50 dark:bg-surface-950/50 absolute top-0 left-0 z-999999999 h-0.75 w-screen"><span class="bg-surface-950/50 dark:bg-surface-50/50 absolute h-0.75"${attr_style("", { width: `${progress.current}%` })}></span></div>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
// src/lib/components/navigation/BottomTabs.svelte
function BottomTabs($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { navItems, user } = $$props;
		const t = getFormatter();
		const current = derived(() => {
			const path = page.url.pathname;
			if (path.startsWith("/aide")) return "app.help";
			const list = page.data?.list;
			if (path.startsWith("/lists/") && list?.owner?.isMe) return "wishes.my-lists";
			if (path === "/lists" || path.startsWith("/lists/") || path.startsWith("/wishlists/")) return "app.home";
		});
		if (user) {
			$$renderer.push(`<!--[0--><nav class="paper-bottom-tabs print:hidden"${attr("aria-label", store_get($$store_subs ??= {}, "$t", t)("a11y.menu"))}><div><!--[-->`);
			const each_array = ensure_array_like(navItems);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let navItem = each_array[$$index];
				$$renderer.push(`<a${attr("aria-current", current() === navItem.labelKey ? "page" : void 0)} data-sveltekit-preload-data=""${attr("href", navItem.href(user))}>${escape_html(store_get($$store_subs ??= {}, "$t", t)(navItem.labelKey))}</a>`);
			}
			$$renderer.push(`<!--]--></div></nav>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/navigation/navigation.ts
var navItems = [
	{
		labelKey: "app.home",
		href: () => resolve("/lists"),
		icon: "ion:people"
	},
	{
		labelKey: "wishes.my-lists",
		href: () => resolve("/wishlists/me"),
		icon: "ion:gift"
	},
	{
		labelKey: "app.help",
		href: () => resolve("/aide"),
		icon: "ion:help-circle"
	}
];
// src/lib/components/toaster/Toaster.svelte
function Toaster($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const t = getFormatter();
		let { yShift } = $$props;
		{
			function children($$renderer, toast) {
				Toast($$renderer, {
					class: "rounded-container",
					toast,
					children: ($$renderer) => {
						if (Toast.Message) {
							$$renderer.push("<!--[-->");
							Toast.Message($$renderer, {
								children: ($$renderer) => {
									if (toast.title) {
										$$renderer.push("<!--[0-->");
										if (Toast.Title) {
											$$renderer.push("<!--[-->");
											Toast.Title($$renderer, {
												children: ($$renderer) => {
													$$renderer.push(`<!---->${escape_html(toast.title)}`);
												},
												$$slots: { default: true }
											});
											$$renderer.push("<!--]-->");
										} else {
											$$renderer.push("<!--[!-->");
											$$renderer.push("<!--]-->");
										}
									} else $$renderer.push("<!--[-1-->");
									$$renderer.push(`<!--]--> `);
									if (Toast.Description) {
										$$renderer.push("<!--[-->");
										Toast.Description($$renderer, {
											children: ($$renderer) => {
												$$renderer.push(`<!---->${escape_html(toast.description)}`);
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
						$$renderer.push(` `);
						if (toast.action) {
							$$renderer.push("<!--[0-->");
							if (Toast.ActionTrigger) {
								$$renderer.push("<!--[-->");
								Toast.ActionTrigger($$renderer, {
									children: ($$renderer) => {
										$$renderer.push(`<!---->${escape_html(toast.action.label)}`);
									},
									$$slots: { default: true }
								});
								$$renderer.push("<!--]-->");
							} else {
								$$renderer.push("<!--[!-->");
								$$renderer.push("<!--]-->");
							}
						} else $$renderer.push("<!--[-1-->");
						$$renderer.push(`<!--]--> `);
						if (Toast.CloseTrigger) {
							$$renderer.push("<!--[-->");
							Toast.CloseTrigger($$renderer, { "aria-label": store_get($$store_subs ??= {}, "$t", t)("a11y.close") });
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					},
					$$slots: { default: true }
				});
			}
			if (Toast.Group) {
				$$renderer.push("<!--[-->");
				Toast.Group($$renderer, {
					style: yShift ? `bottom: ${yShift}px;` : void 0,
					toaster,
					children,
					$$slots: { default: true }
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { data, children } = $$props;
		let showNavigationLoadingBar = false;
		let documentTitle = void 0;
		let disabled = false;
		const titleDisabledUrls = [
			"/login",
			"/signup",
			/^\/$/,
			"/forgot-password",
			"/reset-password",
			"/group-error",
			"/bienvenue",
			/^\/lists\/(?!create$)[^/]+$/,
			/\/history$/,
			/\/setup-wizard\/?.*/
		];
		setFormatter(data.t);
		setLocale(data.locale);
		beforeNavigate(() => {
			showNavigationLoadingBar = true;
		});
		afterNavigate((params) => {
			showNavigationLoadingBar = false;
			documentTitle = document?.title;
			disabled = titleDisabledUrls.find((url) => page.url.pathname.match(url)) !== void 0;
			if (params.type !== "popstate" && params.to?.url.pathname !== params.from?.url.pathname) {
				const elemPage = document.querySelector("#page");
				if (elemPage) elemPage.scrollTop = 0;
			}
		});
		const webManifestLink = derived(() => pwaInfo ? pwaInfo.webManifest.linkTag : "");
		const hideTabs = derived(() => /^\/(bienvenue|setup-wizard)/.test(page.url.pathname));
		let footerHeight = void 0;
		let toasterYShift = derived(() => footerHeight);
		head("12qhfyh", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(APP_NAME)}</title>`);
			});
			$$renderer.push(`${html(webManifestLink())}`);
		});
		$$renderer.push(`<div class="min-h-screen"><header class="sticky top-0 z-15 print:hidden">`);
		if (showNavigationLoadingBar) {
			$$renderer.push("<!--[0-->");
			NavigationLoadingBar($$renderer);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		NavBar($$renderer, {
			groups: data.groups,
			isProxyUser: data.isProxyUser,
			user: data.user
		});
		$$renderer.push(`<!----></header> <main id="main" class="paper-page">`);
		if (!disabled && documentTitle) $$renderer.push(`<!--[0--><h1 class="h1 pb-2 md:pb-4">${escape_html(documentTitle)}</h1>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		children?.($$renderer);
		$$renderer.push(`<!----></main> <footer class="sticky bottom-0 z-10 print:hidden">`);
		if (!hideTabs()) {
			$$renderer.push("<!--[0-->");
			BottomTabs($$renderer, {
				navItems,
				user: data.user
			});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></footer></div> `);
		Toaster($$renderer, { yShift: toasterYShift() });
		$$renderer.push(`<!---->`);
	});
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte.js-DeFbpzj6.js.map
